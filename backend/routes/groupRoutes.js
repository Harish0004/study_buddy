import express from "express";
import User from "../models/userModel.js";
import Group from "../models/groupModel.js";

const groupRouter = express.Router();

groupRouter.post("/create", async (req, res) => {
	try {
		const { groupName, groupDesc, groupCategory } = req.body;
		const email = req.session.user;

		// Validation
		if (!groupName || !groupDesc || !groupCategory || !email) {
			return res.status(400).json({ error: "All fields are required." });
		}

		// Retrieve user ID based on email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: "User not found." });
		}
		const newGroup = new Group({
			groupName,
			groupDesc,
			groupCategory,
			admin: user._id,
			members: [user._id],
		});

		await newGroup.save();

		user.joinedGroups.push(newGroup._id);
		await user.save();

		res.status(201).json({
			message: "Group created successfully!",
			group: newGroup,
		});
	} catch (error) {
		console.error("Error creating group:", error);
		res.status(500).json({ error: "Failed to create group." });
	}
});

groupRouter.get("/groups", async (req, res) => {
	try {
		const recentGroups = await Group.find()
			.sort({ createdAt: -1 }) // Sort by creation time (newest first)
			.limit(3);
		res.status(200).json(recentGroups);
	} catch (error) {
		console.error("Error fetching groups:", error);
		res.status(500).json({ message: "Failed to fetch groups." });
	}
});

groupRouter.get("/search", async (req, res) => {
	const { query } = req.query;

	try {
		const searchResults = await Group.find({
			groupName: { $regex: query, $options: "i" },
		});
		res.status(200).json(searchResults);
	} catch (error) {
		console.error("Error searching groups:", error);
		res.status(500).json({ message: "Failed to search groups." });
	}
});

groupRouter.post("/join", async (req, res) => {
	try {
		const { groupId } = req.body;
		const email = req.session.user;
		if (!groupId || !email) {
			return res
				.status(400)
				.json({ error: "Group ID and user information are required." });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: "User not found." });
		}
		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(404).json({ error: "Group not found." });
		}
		const isUserInGroup = group.members.includes(user._id);
		if (isUserInGroup) {
			return res
				.status(400)
				.json({ error: "User is already a member of this group." });
		}
		group.members.push(user._id);
		await group.save();
		user.joinedGroups.push(group._id);
		await user.save();
		res.status(200).json({ message: "Successfully joined the group!", group });
	} catch (error) {
		console.error("Error joining group:", error);
		res.status(500).json({ error: "Failed to join group." });
	}
});

groupRouter.get("/user/groups", async (req, res) => {
	const email = req.session.user;
	console.log(email);
	try {
		// Find the user by email
		const user = await User.findOne({ email }).populate("joinedGroups");
		console.log(user);
		// If user is not found
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Return the groups the user has joined
		console.log(user.joinedGroups);
		return res.status(200).json(user.joinedGroups);
	} catch (error) {
		// Handle errors
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

export default groupRouter;
