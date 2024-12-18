import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./pages/styles.css";
import Navbar from "./pages/Navbar";

const Register = () => {
	const [username, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const validateEmail = (email) => {
		// Basic email regex for validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password) => {
		// Ensure the password is at least 8 characters, contains a number and a special character
		const passwordRegex =
			/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
		return passwordRegex.test(password);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Client-side validation
		if (!username.trim()) {
			setError("Name is required.");
			return;
		}
		if (!email.trim() || !validateEmail(email)) {
			setError("Please enter a valid email.");
			return;
		}
		if (!password || !validatePassword(password)) {
			setError(
				"Password must be at least 8 characters long, include at least one number, and one special character.",
			);
			return;
		}

		// Clear error if validation passes
		setError("");

		const user = {
			username,
			email,
			password,
		};

		// Sending post request
		axios
			.post("https://study-buddy-backend-sejg.onrender.com/user/register", user)
			.then((result) => {
				console.log("Request handled successfully");
				alert("Registered successfully");
				navigate("/");
			})
			.catch((error) => {
				console.error("Registration error:", error);
				alert("There was an issue connecting to the server.");
			});
	};

	return (
		<div className="register-main">
			<Navbar />
			<div className="register signup">
				<form id="signupForm" onSubmit={handleSubmit}>
					<h1>Register</h1>
					{error && <p className="error-message">{error}</p>}
					<label htmlFor="email">
						<strong>Email</strong>
					</label>
					<input
						type="email"
						placeholder="Enter your email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="name">
						<strong>Name</strong>
					</label>
					<input
						type="text"
						placeholder="Enter your name"
						name="name"
						id="name"
						value={username}
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor="password">
						<strong>Password</strong>
					</label>
					<input
						type="password"
						placeholder="Enter your password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit">Register</button>
				</form>
				<div className="register-link">
					<p>
						Already have an account? <Link to="/">Login</Link>{" "}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
