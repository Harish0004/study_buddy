import React from "react";
import logo_png from "../assets/logo.png";
import "./styles.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	axios.defaults.withCredentials = true;
	const handleLogout = async () => {
		try {
			await axios.get(
				"https://study-buddy-backend-sejg.onrender.com/user/logout",
			);
			console.log("logged out successfully");
			navigate("/");
		} catch {
			console.log("error occured during logout");
		}
	};
	return (
		<div>
			<header>
				<div class="logo-container">
					<img src={logo_png} alt="StudyBuddy Logo" class="logo" />
					<h1>StudyBuddy</h1>
				</div>
				<nav>
					<Link to="/home">
						<a href="#">Home</a>
					</Link>
					<Link to="/group">
						<a href="group.html">Groups</a>
					</Link>
					<Link to="/joinedgroups">
						<a href="#">Joined Groups</a>
					</Link>

					<Link to="/profile">
						<a href="profile.html">Profile</a>
					</Link>
					<Link>
						<a href="#" onClick={handleLogout}>
							Logout
						</a>
					</Link>
				</nav>
			</header>
		</div>
	);
};

export default Navbar;
