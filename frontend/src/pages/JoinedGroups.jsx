import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const JoinedGroups = () => {
	const [groups, setGroups] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	// Fetch all groups initially
	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/group/user/groups",
				);
				setGroups(response.data);
				console.log(groups);
			} catch (err) {
				console.error("Error fetching groups:", err);
			}
		};

		fetchGroups();
	}, []);

	return (
		<>
			<Navbar />
			<div className="study-groups-container">
				<div className="groups-list">
					{groups.map((group) => (
						<div key={group._id} className="group-card">
							<h3>{group.groupName}</h3>
							<p>{group.groupDesc}</p>
							<Link to="/message" state={{ groupId: group._id }}>
								<button className="join-button">View Messages</button>
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default JoinedGroups;
