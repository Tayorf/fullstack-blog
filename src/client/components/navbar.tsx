import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GET, tokenKey } from "../services/fetchHelper";

const Navbar = () => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const nav = useNavigate();
	const loc = useLocation();

	const handleToggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};
	const handleNavLinkClick = () => {
		setIsCollapsed(true);
	};
	const handleLogout = () => {
		handleNavLinkClick();
		localStorage.removeItem(tokenKey);
		setIsLoggedIn(false);
		nav("/login");
	};

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		GET("/auth/checkem").then(() => setIsLoggedIn(true));
	}, [loc.pathname]);

	return (
		<div className="container">
			<nav className="navbar navbar-expand-md">
				<Link className="navbar-brand" to={"/"}>
					<img className="image" src="/assets/websitelogo.png" />
				</Link>
				<button className="navbar-toggler mx-4" type="button" onClick={handleToggleCollapse}>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className={`collapse navbar-collapse ${isCollapsed ? "collapse-transition" : "show collapse-transition"}`}>
					<div className="navbar-nav">
						{isLoggedIn && (
							<Link to={"/"} onClick={handleNavLinkClick} className="text-center text-dark nav-link m-2 fw-bold">
								Home
							</Link>
						)}
						{isLoggedIn && (
							<Link to={"/blogs/new"} onClick={handleNavLinkClick} className="text-center text-info text-nowrap nav-link m-2 fw-bold">
								Create Blogs
							</Link>
						)}
						{isLoggedIn && (
							<Link to={"/admin"} onClick={handleNavLinkClick} className="text-center text-info nav-link m-2 fw-bold">
								Admin
							</Link>
						)}
						<Link to={"/contact"} onClick={handleNavLinkClick} className="text-center text-info nav-link m-2 fw-bold">
							Contact
						</Link>
						<Link to={"/donate"} onClick={handleNavLinkClick} className="text-center text-info nav-link m-2 fw-bold">
							Donate
						</Link>
						{!isLoggedIn && (
							<Link to={"/login"} onClick={handleNavLinkClick} className="text-center text-info nav-link m-2 fw-bold">
								Login
							</Link>
						)}
						{isLoggedIn && (
							<button onClick={handleLogout} className="text-center text-info nav-link m-2 fw-bold">
								Logout
							</button>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;