import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
	const [values, setValues] = useState({
		email: "t1@gmail.com",
		password: "test1",
		error: "",
		loading: false,
		didRedirect: false,
	});

	const { email, password, error, loading, didRedirect } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					authenticate(data, () => {
						setValues({ ...values, didRedirect: true });
					});
				}
			})
			.catch(console.log("Unable to signin"));
	};

	const performRedirect = () => {
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}

		if (isAuthenticated()) {
			return <Redirect to="/"></Redirect>;
		}
	};

	const signInForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group py-2">
							<label className="text-light">Email</label>
							<input
								className="form-control"
								onChange={handleChange("email")}
								value={email}
								type="email"
							/>
						</div>
						<div className="form-group py-2">
							<label className="text-light">Password</label>
							<input
								className="form-control"
								onChange={handleChange("password")}
								value={password}
								type="Password"
							/>
						</div>
						<button className="btn btn-success btn-block" onClick={onSubmit}>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};

	const loadingMessage = () => {
		return (
			loading && (
				<div>
					<div className="row">
						<div className="col-md-6 offset-sm-3 text-left">
							<div className="alert alert-info">
								<h2>Loading...</h2>
							</div>
						</div>
					</div>
				</div>
			)
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base title="Signin Page" description="A page for user to signin!">
			{signInForm()}
			{performRedirect()}
			{loadingMessage()}
			{errorMessage()}
		</Base>
	);
};

export default Signin;
