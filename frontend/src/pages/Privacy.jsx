import React from "react";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
const Privacy = () => {
	return (
		<div>
			<Navbar />
			<section class="privacy-policy">
				<h3>Privacy Policy</h3>

				<p>
					At StudyBuddy, we value your privacy and are committed to protecting
					the personal information you share with us. This Privacy Policy
					explains how we collect, use, and safeguard your data when you use our
					website and services.
				</p>

				<h4>1. Information We Collect</h4>
				<p>
					We collect the following types of personal information when you use
					StudyBuddy:
				</p>
				<ul>
					<li>
						<strong>Personal Information:</strong> This includes your name,
						email address, profile picture, and any other information you
						provide when signing up, creating a profile, or using our services.
					</li>
					<li>
						<strong>Usage Information:</strong> We collect information about how
						you use StudyBuddy, such as your interactions with groups, chats,
						and resources shared within the platform.
					</li>
					<li>
						<strong>Device and Log Information:</strong> We may collect data
						from the device you're using to access StudyBuddy, including browser
						type, IP address, and operating system, for analytical purposes and
						to improve our services.
					</li>
					<li>
						<strong>Cookies:</strong> We use cookies to enhance user experience,
						personalize content, and track website activity. You can control
						cookie settings through your browser.
					</li>
				</ul>

				<h4>2. How We Use Your Information</h4>
				<p>Your personal information is used for the following purposes:</p>
				<ul>
					<li>
						<strong>To Provide Our Services:</strong> We use your information to
						allow you to create an account, join groups, participate in
						discussions, and access study materials.
					</li>
					<li>
						<strong>To Improve Our Platform:</strong> We analyze usage data to
						improve the functionality, design, and performance of StudyBuddy.
					</li>
					<li>
						<strong>To Communicate with You:</strong> We may send you
						notifications, updates, and promotional content related to
						StudyBuddy. You can opt-out of non-essential communications at any
						time.
					</li>
					<li>
						<strong>To Ensure Security:</strong> Your data is used to monitor
						and protect the security of StudyBuddy, ensuring a safe environment
						for all users.
					</li>
				</ul>

				<h4>3. Sharing Your Information</h4>
				<p>
					We do not sell, trade, or rent your personal information to third
					parties. However, we may share your information in the following
					circumstances:
				</p>
				<ul>
					<li>
						<strong>Service Providers:</strong> We may share your data with
						trusted third-party service providers who help us operate our
						website, process payments, or improve our services.
					</li>
					<li>
						<strong>Legal Requirements:</strong> If required by law, we may
						disclose your information to comply with a legal obligation or
						government request.
					</li>
					<li>
						<strong>Business Transfers:</strong> In the event of a merger,
						acquisition, or sale of all or part of our business, your
						information may be transferred as part of that transaction.
					</li>
				</ul>

				<h4>4. Data Security</h4>
				<p>
					We implement reasonable technical and organizational measures to
					protect your personal information from unauthorized access, loss, or
					misuse. However, no system is completely secure, and we cannot
					guarantee the absolute security of your data.
				</p>

				<h4>5. Your Rights</h4>
				<p>
					You have the following rights regarding your personal information:
				</p>
				<ul>
					<li>
						<strong>Access:</strong> You can request access to the personal
						information we have collected about you.
					</li>
					<li>
						<strong>Correction:</strong> You can update or correct any
						inaccuracies in your personal information.
					</li>
				</ul>

				<h4>6. Changes to This Privacy Policy</h4>
				<p>
					We may update this Privacy Policy from time to time. If we make
					significant changes to how we handle your personal information, we
					will notify you by email or through a notice on our website. We
					encourage you to review this policy periodically to stay informed
					about how we protect your data.
				</p>
			</section>
			<Footer />
		</div>
	);
};

export default Privacy;
