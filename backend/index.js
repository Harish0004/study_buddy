import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
import { mongodbURL } from "./config.js";
import userRoutes from "./routes/userRoutes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import User from "./models/userModel.js";
import router from "./routes/userRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

// Create an instance of an express app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware to parse JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
const upload = multer({
	limits: { fileSize: 10 * 1024 * 1024 }, // Limit set to 10MB
});

// Enable CORS with credentials
app.use(
	cors({
		origin: true,
		credentials: true, // Set this to 'true' to allow cookies
		methods: ["GET", "POST", "PUT"],
	}),
);

app.use(cookieParser());

// Session middleware configuration
app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		secret: "secret", // replace with an actual secret
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false, // 'true' only in production with HTTPS
			httpOnly: false, // allows client-side JavaScript to access cookies if needed
			maxAge: 24 * 60 * 60 * 1000, // session duration: 1 day
		},
	}),
);

app.use(bodyParser.json());

app.get("/getuser", async (req, res) => {
	console.log(req.session.user);
	if (req.session.user) {
		const user = await User.findOne({ email: req.session.user });
		res.send(user.username);
		console.log(user);
	} else {
		return res.json({ valid: false });
	}
});

app.get("/", async (req, res) => {
	try {
		if (req.session.user) {
			return res.json({ valid: true });
		} else {
			return res.json({ valid: false });
		}
	} catch {
		res.json("error occured");
	}
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

// Routes
app.use("/user", userRoutes);
app.use("/api/messages", messageRouter);
app.use("/group", groupRouter);

// Database connection and server start
mongoose
	.connect(mongodbURL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`The server is running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Database connection error:", error.message);
	});
