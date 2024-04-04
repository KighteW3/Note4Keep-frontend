import { useEffect, useState } from "react";
import { logOutFunc } from "../components/logOut";
import getUserOptions from "../components/userOptions";
import { useAppSelector } from "../hooks/store";
import "../styles/Profile.css";
import type { UserOptions } from "../components/userOptions";
import { userOptionsTemplate } from "../components/userOptions";


export default function Profile() {
	const userInfo = useAppSelector((state) => state.userInfo);
	const [userOptions, setUserOptions] = useState<UserOptions>(userOptionsTemplate);

	const username = userInfo.userInfo.username || "unknown";
	const email = userInfo.userInfo.email || "No email provided";

	useEffect(() => {
		const authraw = localStorage.getItem("SESSION_ID");

		if (!authraw) {
			throw "No session id"
		}

		(async () => {
			try {
				const res = await getUserOptions(authraw);
				setUserOptions(res);
			} catch (e) {
				throw "May not consume the API."
			}
		})()


	}, [])

	useEffect(() => {
		console.log(userOptions);
	}, [userOptions])

	return (
		<div className="profile">
			<div className="profile__box">
				<div className="profile__box__info">
					<div className="profile__box__info__picture">
						<img
							src="/photos/default.png"
							alt="user profile"
						/>
					</div>
					<div className="profile__box__info__text">
						<span>{`username: ${username}`}</span>
						<span>{`email: ${email}`}</span>
					</div>
				</div>
				<div className="profile__box__options">
					<div className="profile__box__options__box">
						<form>Options unavailable for now...</form>
						{`${userOptions.picture}`}
					</div>
				</div>
				<div className="profile__box__logout">
					<button type="button" onClick={logOutFunc}>
						LogOut
					</button>
				</div>
			</div>
		</div>
	);
}
