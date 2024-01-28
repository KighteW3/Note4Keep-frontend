import { logOutFunc } from "../components/logOut";
import { useAppSelector } from "../hooks/store";
import "../styles/Profile.css";

export default function Profile() {
	const userInfo = useAppSelector((state) => state.userInfo);

	const username = userInfo.userInfo.username || "unknown";
	const email = userInfo.userInfo.email || "No email provided";

	return (
		<div className="profile">
			<div className="profile__box">
				<div className="profile__box__info">
					<div className="profile__box__info__picture">
						<img
							src="https://366icons.com/media/01/profile-avatar-account-icon-16699.png"
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
