import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	profile: {
		type: String,
		trim: true,
	},
	bio: {
		type: String,
		trim: true,
	},
	interest: {
		type: String,
		trim: true,
	},
	joinedGroups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Group", // reference to the Group model
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	img: {
		type: String,
		trim: true,
	},
});

export default mongoose.model("User", userSchema);
