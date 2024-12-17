import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Group = () => {
	const [groups, setGroups] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	// Fetch all groups initially
	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const response = await axios.get("http://localhost:5000/group/groups");
				setGroups(response.data);
			} catch (err) {
				console.error("Error fetching groups:", err);
			}
		};

		fetchGroups();
	}, []);

	// Function to handle joining a group
	const handleJoinGroup = async (groupId) => {
		try {
			const response = await axios.post("http://localhost:5000/group/join", {
				groupId,
			});
			alert(response.data.message); // Show success message
		} catch (error) {
			const errorMessage =
				error.response?.data?.error || "Failed to join group.";
			alert(errorMessage); // Show the server's error message
		}
	};

	// Function to search for groups
	const searchGroups = async () => {
		try {
			const response = await axios.get(
				`http://localhost:5000/group/search?query=${searchQuery}`,
			);
			setGroups(response.data); // Update the groups with the search result
		} catch (err) {
			console.error("Error searching groups:", err);
		}
	};

	return (
		<>
			<Navbar />
			<div className="study-groups-container">
				<h1>Find Your Study Group</h1>
				<div className="search-bar">
					<input
						type="text"
						placeholder="Search for groups..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button onClick={searchGroups}>Search</button>
				</div>
				<Link to="/creategroup">
					<button className="create-group-button">Create a New Group</button>
				</Link>

				<div className="groups-list">
					{groups.map((group) => (
						<div key={group._id} className="group-card">
							<h3>{group.groupName}</h3>
							<p>{group.groupDesc}</p>
							<button
								onClick={() => handleJoinGroup(group._id)} // Pass groupId when button is clicked
								className="join-button"
							>
								Join Group
							</button>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Group;
