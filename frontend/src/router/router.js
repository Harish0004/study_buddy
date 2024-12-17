import { createBrowserRouter } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import About from "../pages/About";
import Home from "../pages/HomePage";
import Group from "../pages/Group";
import Profile from "../pages/Profile";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import CreateGroup from "../pages/CreateGroup";
import Message from "../pages/Message";
import JoinedGroups from "../pages/JoinedGroups";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/about",
		element: <About />,
	},
	{
		path: "/group",
		element: <Group />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/contact",
		element: <Contact />,
	},
	{
		path: "/privacy",
		element: <Privacy />,
	},
	{
		path: "/creategroup",
		element: <CreateGroup />,
	},
	{
		path: "/joinedgroups",
		element: <JoinedGroups />,
	},
	{
		path: "/message",
		element: <Message />,
	},
]);

export default router;
