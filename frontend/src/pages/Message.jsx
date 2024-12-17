import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./message.css";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Message = () => {
	const [messages, setMessages] = useState([]); // Holds all messages
	const [newMessage, setNewMessage] = useState(""); // Holds the current input message
	const [name, setName] = useState();
	const [file, setFile] = useState(null); // Holds the uploaded file
	const chatBoxRef = useRef(null); // Reference for the chat box for scrolling
	const location = useLocation();
	const { groupId } = location.state || {};

	// Fetch messages on component mount
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("http://localhost:5000/getuser");
				setName(res.data);
				console.log(res.data);
			} catch (error) {
				console.log("error fetching: ", error);
			}
		};

		const fetchMessages = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/messages?groupId=${groupId}`,
				);
				setMessages(response.data);
				scrollToBottom(); // Scroll to the bottom initially
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};

		fetchUser();
		fetchMessages();
	}, []);

	// Scroll to the bottom of the chat box
	const scrollToBottom = () => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
	};

	// Handle sending a new message with file upload
	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!newMessage.trim() && !file) return; // Don't send empty messages or no file

		const formData = new FormData();
		formData.append("sender", name);
		formData.append("content", newMessage);
		formData.append("groupId", groupId);
		if (file) formData.append("file", file);

		try {
			const response = await axios.post(
				"http://localhost:5000/api/messages",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data", // Set the correct header for file uploads
					},
				},
			);

			setMessages([...messages, response.data]); // Append the new message
			setNewMessage(""); // Clear the input
			setFile(null); // Clear the file input
			scrollToBottom(); // Scroll to the bottom after sending
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	// Handle file input change
	const handleFileChange = (e) => {
		setFile(e.target.files[0]); // Save the uploaded file
	};

	return (
		<>
			<Navbar />
			<div className="chat-container">
				<h2>Group Chat</h2>
				<div className="chat-box" ref={chatBoxRef}>
					{messages.map((message, index) => (
						<div
							key={index}
							className={`message ${
								message.sender === name ? "sent" : "received"
							}`}
						>
							<div className="sender-name">{message.sender}</div>
							<div className="message-content">{message.content}</div>
							{/* Display file link if available */}
							{message.file && (
								<div>
									<a
										className="download"
										href={`http://localhost:5000/uploads/${message.file}`}
										target="_blank"
										rel="noopener noreferrer"
										download
									>
										Download {message.file}
									</a>
								</div>
							)}
						</div>
					))}
				</div>
				<form onSubmit={handleSendMessage}>
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Type a message..."
						required
					/>
					<input type="file" onChange={handleFileChange} />
					<button type="submit">Send</button>
				</form>
			</div>
		</>
	);
};

export default Message;
