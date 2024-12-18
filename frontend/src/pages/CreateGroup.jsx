import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Import the external CSS file
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateGroup = () => {
	const [groupName, setGroupName] = useState("");
	const [groupDesc, setgroupDesc] = useState("");
	const [groupCategory, setGroupCategory] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState(""); // State for error messages

	const validateForm = () => {
		// Basic validation rules
		if (!groupName.trim()) {
			setError("Group name is required.");
			return false;
		}
		if (groupName.length < 3) {
			setError("Group name must be at least 3 characters long.");
			return false;
		}
		if (!groupDesc.trim()) {
			setError("Group description is required.");
			return false;
		}
		if (!groupCategory.trim()) {
			setError("Group category is required.");
			return false;
		}
		setError(""); // Clear any existing errors
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form before making the API call
		if (!validateForm()) {
			return;
		}

		try {
			const response = await axios.post(
				"https://study-buddy-backend-sejg.onrender.com/group/create",
				{
					groupName,
					groupDesc,
					groupCategory,
				},
			);

			if (response.status === 201) {
				setMessage("Group created successfully!");
				setGroupName("");
				setgroupDesc("");
				setGroupCategory("");
			} else {
				setMessage("Failed to create group. Please try again.");
			}
		} catch (error) {
			console.error("Error while creating group:", error);
			setMessage("An error occurred. Please try again later.");
		}
	};

	return (
		<>
			<Navbar />
			<div className="create-group-container">
				<h2>Create a New Group</h2>
				{message && <p className="message success">{message}</p>}
				{error && <p className="message error">{error}</p>}
				<form onSubmit={handleSubmit} className="create-group-form">
					<div className="form-group">
						<label>Group Name:</label>
						<input
							type="text"
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Group Description:</label>
						<textarea
							value={groupDesc}
							onChange={(e) => setgroupDesc(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Group Category:</label>
						<input
							type="text"
							value={groupCategory}
							onChange={(e) => setGroupCategory(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="submit-button">
						Create Group
					</button>
				</form>
			</div>
			<Footer />
		</>
	);
};

export default CreateGroup;
