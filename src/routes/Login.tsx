import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { URLbackend, URLFrontend } from "../assets/URLs";
import "../styles/AuthInterface.css";
import Loading from "../components/Loading";
import { useAppSelector } from "../hooks/store";
import { useDispatch } from "react-redux";
import { setIsLoadingGlobal } from "../store/loadingState";

const URL = `${URLbackend}/api/users/login`;

export default function Register() {
	const navigate = useNavigate();
	const isLoading = useAppSelector((state) => state.loadingGlobal.isLoading);
	const dispatch = useDispatch();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const form = event.target as typeof event.target & {
			username: { value: string };
			password: { value: string };
		};

		const username = form.username.value;
		const password = form.password.value;

		const data = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		};

		dispatch(setIsLoadingGlobal(true));

		(async () => {
			try {
				const res = await fetch(URL, data);
				const result = await res.json();

				if (res.ok) {
					window.localStorage.setItem("SESSION_ID", JSON.stringify(result));
					dispatch(setIsLoadingGlobal(false));
					navigate("/", { state: { shouldRender: true } });
					window.open(`${URLFrontend}/`, "_self");
				} else {
					console.error(res.statusText);
					dispatch(setIsLoadingGlobal(false));
				}
			} catch (e) {
				console.error(e);
				dispatch(setIsLoadingGlobal(false));
			}
		})();
	};

	return (
		<div className="auth">
			<div className="auth-content">
				<form onSubmit={handleSubmit} className="auth-interface">
					<div className="auth-interface__content">
						<label htmlFor="auth-login__content__username">
							Nombre de usuario:
						</label>
						<input
							id="auth-login-username"
							type="text"
							placeholder="username"
							name="username"
							required
						/>
					</div>
					<div className="auth-interface__content">
						<label htmlFor="auth-login__content__password">Contraseña:</label>
						<input
							id="auth-login-password"
							type="password"
							placeholder="password"
							name="password"
							required
						/>
					</div>
					<div className="auth-interface__submit">
						<input type="submit" value="Enviar" />
						<Loading isLoading={isLoading} />
					</div>
				</form>
			</div>
		</div>
	);
}
