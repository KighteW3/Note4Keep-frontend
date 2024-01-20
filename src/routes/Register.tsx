import { FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { updateLoginInfo } from "../store/userInfo";
import { URLFrontend, URLbackend } from "../assets/URLs";
import "../styles/AuthInterface.css";
import Loading from "../components/Loading";
import { setIsLoadingGlobal } from "../store/loadingState";

export default function Register() {
	const isLoading = useAppSelector((state) => state.loadingGlobal.isLoading);
	const dispatch = useAppDispatch();
	const authData = useAuth();

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const form = event.target as typeof event.target & {
			username: { value: string };
			password: { value: string };
			email: { value: string };
		};

		const username = form.username.value;
		const password = form.password.value;
		const email = form.email.value;

		const data = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
			}),
		};

		dispatch(setIsLoadingGlobal(true));

		(async () => {
			try {
				const url = `${URLbackend}/api/users/create-user`;
				const res = await fetch(url, data);
				const result = await res.json();

				if (res.ok) {
					window.localStorage.setItem("SESSION_ID", JSON.stringify(result));
					dispatch(setIsLoadingGlobal(false));
					dispatch(updateLoginInfo(authData));
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
							id="auth-login__content__username"
							type="text"
							placeholder="username"
							name="username"
							required
						/>
					</div>
					<div className="auth-interface__content">
						<label htmlFor="auth-login__content__password">Contraseña:</label>
						<input
							id="auth-login__content__password"
							type="password"
							placeholder="password"
							name="password"
							required
						/>
					</div>
					<div className="auth-interface__content">
						<label htmlFor="auth-login__content__email">
							{"Correo electrónico (opcional):"}
						</label>
						<input
							id="auth-login__content__email"
							type="mail"
							placeholder="email"
							name="email"
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
