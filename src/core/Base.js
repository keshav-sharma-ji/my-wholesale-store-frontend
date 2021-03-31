import React from "react";
import Menu from "./Menu";

const Base = ({
	title = "My Title",
	description = "Description",
	className = "bg-grey text-white p-4",
	children,
}) => (
	<div>
		<Menu />
		<div className="containerfluid">
			<div className="jumbotron bg-grey text-white text-center">
				<h2 className="display-4">{title}</h2>
				<p className="lead">{description}</p>
			</div>
			<div className={className}>{children}</div>
		</div>
		<footer className="footer bg-grey mt-auto py-3">
			<div className="container-fluid bg-success text-white text-center py-3">
				<h4>If you have any questions feel free to reach out</h4>
				<button className="btn btn-warning btn-lg">Contact Us</button>
			</div>
			<div className="container">
				<span className="text-muted">
					An Amazing <span className="text-white">MERN</span> Bootchamp
				</span>
			</div>
		</footer>
	</div>
);

export default Base;
