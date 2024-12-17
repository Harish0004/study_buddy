import express from "express";
import User from "../models/userModel.js";
import cors from "cors";
import session from "express-session";

const router = express.Router();

router.get("/logout", (req, res) => {
	req.session.user = null;
	res.send("logged out successfully");
});

router.post("/register", (req, res) => {
	User.create(req.body)
		.then(() => {
			res.send("user created successfully");
		})
		.catch((error) => {
			res.status(500).send(error.message);
		});
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }).then(async (user) => {
		if (user) {
			if (user.password === password) {
				req.session.user = user.email;
				res.json({ login: true, user: req.session.user });
			} else {
				res.json({ login: false });
			}
		} else {
			res.json("no user exists");
		}
	});
});

router.post("/profile", async (req, res) => {
	const { username, bio, email, interest, img } = req.body;

	try {
		// Check if profile exists, and update it if so
		const profile = await User.findOneAndUpdate(
			{ email: req.session.user }, // Find by email (unique identifier)
			{ $set: { username, email, bio, interest, img } }, // Use $set to update fields
			{ new: true, upsert: false }, // Return the updated document
		);

		res.status(200).json({
			message: "Profile updated successfully!",
			profile,
		});
	} catch (error) {
		console.error("Error updating profile:", error);
		res.status(500).json({
			message: "An error occurred while updating the profile.",
			error: error.message,
		});
	}
});

router.get("/profile", async (req, res) => {
	if (!req.session.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const user = await User.findOne({ email: req.session.user }); // Assuming `req.session.user` is the email

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({
			username: user.username,
			bio: user.bio,
			email: user.email,
			interest: user.interest,
			img: user.img,
		});
	} catch (error) {
		console.error("Error fetching profile:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

export default router;
