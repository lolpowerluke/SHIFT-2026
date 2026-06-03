import React from "react";
import "./index.css";
import Footer from "../../components/Footer.jsx";
import { Link } from "react-router";

export default function Login() {
	return (
		<>
			<div className="wrap">
				<div className="section">
					<h1>Project formulier</h1>
					<h3>
						Vul het korte formulier in om je project op de Shift festival
						website te plaatsen.
					</h3>
					<form className="form-3de" action="#">
						<div className="emailDiv">
							<input
								type="email"
								name="email"
								id="email"
								placeholder="E-mail..."
								autocomplete="email"
								required
							/>
						</div>
						<div className="textWrap">
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password..."
								required
							/>
						</div>
						<div className="submitDiv">
							<button className="submit" type="submit">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
