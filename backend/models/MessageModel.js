import { Schema, model } from "mongoose";

const messageSchema = new Schema({
	groupId: { type: String, required: true }, // The ID of the group
	sender: { type: String, required: true }, // User ID or name of the sender
	content: { type: String, required: true }, // Message content
	timestamp: { type: Date, default: Date.now }, // Time of the message
	file: { type: String, default: null }, // Optional file associated with the message (stores the file name or path)
});

export default model("Message", messageSchema);
