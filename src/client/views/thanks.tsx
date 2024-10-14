import React from "react";
import { Link } from "react-router-dom";

interface ThanksProps {}

const Thanks = (props: ThanksProps) => {
	return (
		<main className="container d-flex flex-column align-items-center justify-content-center">
			<section className="row">
				<div className="col-12 text-center">
					<h1 className="display-4">Thank You!</h1>
					<p className="lead">We appreciate your generous donation.</p>
					<hr className="my-4" />
					<p>Your support helps us continue our work and make a difference.</p>
					<Link to={"/"} className="btn btn-info btn-lg mt-3">
						Go Back to Home
					</Link>
				</div>
			</section>
		</main>
	);
};

export default Thanks;