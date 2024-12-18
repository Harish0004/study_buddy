import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import profile_img from "../assets/default-avatar.png";
import Footer from "./Footer";
import axios from "axios"; // Import Axios
import imageCompression from "browser-image-compression";
import { Navigate } from "react-router-dom";

const Profile = () => {
	const [img, setImage] = useState(profile_img);
	const [username, setUsername] = useState();
	const [bio, setBio] = useState();
	const [email, setEmail] = useState();
	const [interest, setInterest] = useState();

	useEffect(() => {
		axios
			.get("https://study-buddy-backend-sejg.onrender.com/user/profile", {
				withCredentials: true,
			}) // Ensure credentials like cookies are sent
			.then((res) => {
				const { username, bio, email, interest, img } = res.data;
				setUsername(username);
				setBio(bio);
				setEmail(email);
				setInterest(interest);
				setImage(img);
			})
			.catch((error) => {
				console.error("Error fetching profile data:", error);
			});
	}, []);

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];
		if (file) {
			try {
				const options = {
					maxSizeMB: 1, // Compress to max 1MB
					maxWidthOrHeight: 1024, // Max dimensions
					useWebWorker: true,
				};

				const compressedFile = await imageCompression(file, options);
				const reader = new FileReader();
				reader.onload = () => {
					setImage(reader.result); // Set Base64 string as the image
				};
				reader.readAsDataURL(compressedFile); // Convert image to Base64
			} catch (error) {
				console.error("Error compressing image:", error);
			}
		}
	};

	// Save changes
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Combine all data, including the image
			const dataToSend = {
				username,
				interest,
				bio,
				email,
				img,
			};

			// Axios POST request
			const response = await axios.post(
				"https://study-buddy-backend-sejg.onrender.com/user/profile",
				dataToSend,
			);

			if (response.status === 200) {
				alert("Profile updated successfully!");
			} else {
				alert("Failed to update profile.");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div>
			<Navbar />
			<section className="profile">
				<h2>Your Profile</h2>
				<div className="profile-container">
					<div className="profile-pic">
						<img src={img || profile_img} alt="Profile" id="profileImage" />
						<input
							type="file"
							id="uploadImage"
							accept="image/*"
							onChange={handleImageUpload}
						/>
					</div>
					<div className="profile-info">
						<form id="profileForm" onSubmit={handleSubmit}>
							<label htmlFor="name">Name:</label>
							<input
								type="text"
								id="name"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>

							<label htmlFor="bio">Bio:</label>
							<textarea
								id="bio"
								rows="4"
								value={bio}
								onChange={(e) => setBio(e.target.value)}
							/>

							<label htmlFor="email">Email:</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<label htmlFor="interests">Interests:</label>
							<input
								type="text"
								id="interests"
								value={interest}
								onChange={(e) => setInterest(e.target.value)}
							/>

							<button type="submit">Save Changes</button>
						</form>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Profile;
