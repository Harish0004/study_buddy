import React from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";

const About = () => {
	return (
		<div>
			<Navbar />
			<section className="about-section">
				<h2>About StudyBuddy</h2>
				<br />
				<p>
					StudyBuddy is a collaborative learning platform designed to help
					students find, create, and participate in study groups with ease.
					Whether you're looking to study for an exam, work on a group project,
					or simply connect with others who share your academic interests,
					StudyBuddy provides all the tools you need for effective and enjoyable
					learning.
				</p>
				<p>
					Our platform is built with simplicity and functionality in mind,
					making it easy for students to organize their studies, collaborate
					with peers, and share resources. StudyBuddy is more than just a tool;
					it's a community where students can support each other, discuss ideas,
					and grow together academically.
				</p>
				<br />

				<div className="about-content">
					<h3>Our Mission</h3>
					<br />
					<p>
						At StudyBuddy, our mission is to provide students with a platform
						that fosters collaboration, learning, and community building. We
						believe that studying together can not only enhance understanding
						but also keep students motivated and engaged. Our goal is to bridge
						the gap between students and make academic collaboration accessible
						to everyone, no matter their location or background.
					</p>
					<br />

					<h3>Our Vision</h3>
					<br />
					<p>
						We envision a world where students can seamlessly collaborate and
						share knowledge with one another. StudyBuddy aims to be the go-to
						resource for academic collaboration, enabling students to study
						smarter, not harder, by working together. We strive to be a
						supportive space that encourages learning, interaction, and growth
						through collaboration.
					</p>
					<br />

					<h3>How StudyBuddy Works</h3>
					<br />
					<p>
						StudyBuddy allows you to create or join study groups based on your
						academic subjects, interests, or specific study goals. The process
						is simple:
					</p>
					<br />
					<ol>
						<li>
							<strong>Create an Account:</strong> Sign up with your email,
							create a profile, and get started.
						</li>
						<li>
							<strong>Find or Create a Group:</strong> Browse available groups
							by subject or interest, or create your own group.
						</li>
						<li>
							<strong>Collaborate and Learn:</strong> Participate in real-time
							chats, share study resources, and discuss topics with your group
							members.
						</li>
						<li>
							<strong>Stay Motivated:</strong> Use the platform to set study
							goals, track progress, and stay motivated through peer support.
						</li>
					</ol>
					<br />
					<h3>Join Us Today!</h3>
					<br />
					<p>
						Ready to take your study game to the next level? Sign up today, join
						a study group, and start collaborating with peers who share your
						academic interests. Let StudyBuddy be the platform that supports you
						throughout your academic journey!
					</p>
				</div>
				<br />
			</section>
			<Footer />
		</div>
	);
};

export default About;
