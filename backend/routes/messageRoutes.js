import express from "express";
import User from "../models/userModel.js";
import Group from "../models/groupModel.js";
import Message from "../models/MessageModel.js";
import multer from "multer";
import path from "path";

const messageRouter = express.Router();

messageRouter.get("/", async (req, res) => {
	try {
		const { groupId } = req.query;
		const messages = await Message.find({ groupId: groupId }).sort({
			timestamp: 1,
		});
		console.log(messages);
		res.json(messages);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch messages" });
	}
});

// Post a new message

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Save uploaded files to "uploads" folder
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname); // Keep the original file name
	},
});
const upload = multer({ storage: storage });

// API endpoint to send a message (with file upload support)
messageRouter.post("/", upload.single("file"), async (req, res) => {
	const { sender, content, groupId } = req.body;
	const file = req.file ? req.file.filename : null; // Get the filename if a file is uploaded

	try {
		const newMessage = new Message({
			sender,
			content,
			groupId,
			file, // Save file path or filename
		});

		await newMessage.save(); // Save message to the database

		// Return the new message (including the file path)
		res.status(200).json(newMessage);
	} catch (error) {
		console.error("Error saving message:", error);
		res.status(500).json({ message: "Error saving message." });
	}
});

export default messageRouter;
