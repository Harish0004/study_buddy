import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import "./pages/styles.css";
//import Navbar from "./Navbar";

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	// axios.defaults.withCredentials = true;

	const handleLogin = (e) => {
		e.preventDefault();
		const user = {
			email,
			password,
		};
		axios
			.post("https://study-buddy-backend-sejg.onrender.com/user/login", user)
			.then((result) => {
				if (result.data.login) {
					console.log(`User  logged in at ${new Date()}`);
					navigate("/home");
				} else if (!result.data.login) {
					alert("password is wrong");
				} else {
					alert("user not registered");
				}
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<Navbar />
			<div className="login-main">
				<div className="login">
					<form onSubmit={handleLogin}>
						<h1>Login</h1>
						<label htmlFor="email">
							<strong>Email</strong>
						</label>
						<input
							type="email"
							placeholder="Enter your email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor="passsword">
							<strong>Password</strong>
						</label>
						<input
							type="password"
							placeholder="Enter your password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button>Login</button>
					</form>
					<div className="register-link">
						<p>
							New User? <Link to="/register">Register</Link>{" "}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
