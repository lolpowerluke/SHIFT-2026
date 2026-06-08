import { useNavigate } from "react-router";
import { useState } from "react";
import s from "./Login.module.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const email = e.target.email.value.trim();
		const password = e.target.password.value;

		try {
			const res = await fetch(`${BASE_URL}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json();

			if (!data.success) {
				setError(data.message || "Login mislukt");
				return;
			}

			localStorage.setItem("token", data.token);
			navigate("/project-form", { replace: true });
		} catch {
			setError("Netwerk fout, probeer opnieuw");
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<div className="wrap">
				<div className="section">
					<h1>Login</h1>
					<form className={s.form} onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="E-mail..."
								autoComplete="email"
								required
							/>
						</div>
						<div>
							<label htmlFor="password">Wachtwoord</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Password..."
								required
							/>
						</div>
						{error && <p className={s.error}>{error}</p>}
						<button className={s.submit} type="submit" disabled={loading}>
							{loading ? "Bezig..." : "Login"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
