import mongoose, { mongo } from "mongoose";

const groupSchema = new mongoose.Schema({
	groupName: {
		type: String,
		required: true,
	},
	groupDesc: {
		type: String,
		required: true,
	},
	groupCategory: {
		type: String,
		required: true,
	},
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model("Group", groupSchema);
