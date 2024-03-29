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
							src="https://www.startpage.com/av/proxy-image?piurl=http%3A%2F%2Fwww.iconeasy.com%2Ficon%2Fpng%2FEmoticon%2FYolks%2FXD.png&sp=1710676110T19dc2928b7fbb388cb25f7e672eafd5408ae9a29c9906b7a4f02481bfa5153e4"
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
