import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {

	return (
		<>
			<div className="card-footer bg-info mt-5">
				<div className="row justify-content-center mx-4 p-4">
					<div className="col-12 col-md-4">
						<h5 className="fw-bold">The Mulligan Mashup</h5>
						<p>Swing into success with The Mulligan Mashup, where every stroke tells a story.</p>
					</div>
					<div className="col-12 col-md-4">
						<h5 className="fw-bold">Navigate</h5>
						<Link to={"/"} className="nav-link m-2 fw-bold">
							Home
						</Link>
						<Link to={"/blogs/new"} className="nav-link m-2 fw-bold">
							Create Blogs
						</Link>
						<Link to={"/admin"} className="nav-link m-2 fw-bold">
							Admin
						</Link>
						<Link to={"/contact"} className="nav-link m-2 fw-bold">
							Contact
						</Link>
						<Link to={"/donate"} className="nav-link m-2 fw-bold">
							Donate
						</Link>
					</div>
			<div className="card-footer">
				<p className="text-center p-3 m-0">@2024 The Mulligan Mashup All rights reserved</p>
			</div>
		)
export default Footer;