import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import students_studying from "../assets/students-studying.jpg";
import file_sharing_icon from "../assets/file-sharing-icon.png";
import chatIcon from "../assets/chaticon.png";
import group from "../assets/group-icon.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	axios.defaults.withCredentials = true;

	useEffect(() => {
		try {
			axios.get("http://localhost:5000/").then((res) => {
				if (res.data.valid) {
					console.log("user name stored in session");
				} else {
					console.log("user not in session");
					console.log(res.data.valid);
					navigate("/");
				}
			});
		} catch {
			console.log("error occured in login");
		}
	}, []);

	return (
		<div>
			<Navbar />
			<section class="hero">
				<div class="hero-content">
					<h2>Connect with Your Study Group</h2>
					<p>
						Join study groups, chat, and share resources to make studying
						easier.
					</p>
					<button>
						<Link
							to="/group"
							style={{ color: "white", textDecoration: "none" }}
						>
							Get Started
						</Link>
					</button>
				</div>
				<div class="hero-image">
					<img src={students_studying} alt="Students studying together" />
				</div>
			</section>
			<section class="features">
				<div class="feature">
					<img src={chatIcon} alt="Chat Icon" />
					<h3>Real-Time Chat</h3>
				</div>
				<div class="feature">
					<img src={file_sharing_icon} alt="File Sharing Icon" />
					<h3>File Sharing</h3>
				</div>
				<div class="feature">
					<img src={group} alt="Group Icon" />
					<h3>Find Groups</h3>
				</div>
			</section>
			<Footer />
		</div>
	);
};
export default Home;
