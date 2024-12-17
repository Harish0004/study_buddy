import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
	return (
		<div>
			<footer>
				<p>© 2024 StudyBuddy. All rights reserved.</p>
				<div class="footer-links">
					<Link to="/about">
						<a href="#">About</a>
					</Link>
					<Link to="/contact">
						<a href="#">Contact</a>
					</Link>
					<Link to="/privacy">
						<a href="#">Privacy Policy</a>
					</Link>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
