import React, { useState } from "react";
import { POST } from "../services/fetchHelper";

const Contact = () => {
	const [data, setData] = useState({
		from: "",
		subject: "",
		message: "",
	});

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
		setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
	};

	const handleContactSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		POST("/api/contact", data);
		setData({
			from: "",
			subject: "",
			message: "",
		});
	};

	return (
		<>
			<div className="container">
				<div className="row justify-content-center align-items-center">
					<h1 className="my-5 fw-bold text-center">Contact Me</h1>
					<div className="col-12 col-md-6">
						<form>
							<input className="form-control mt-4" placeholder="Email" name="from" value={data.from} onChange={handleChanges} />
							<input className="form-control mt-4" placeholder="Title" name="subject" value={data.subject} onChange={handleChanges} />
							<textarea name="message" placeholder="Message" rows={5} className="form-control mt-4" value={data.message} onChange={handleChanges}></textarea>
							<button className="btn btn-info mt-3" onClick={handleContactSubmit}>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contact;