import "../styles/Home.css";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotePreview from "../components/NotePreview";
import { URLbackend } from "../assets/URLs";
import Loading from "../components/Loading";

interface resultInfo {
	ok: boolean;
	userInfo: {
		username: string;
		email: string;
	};
}

interface notes {
	note_id: string;
	title: string;
	priority: number;
	text: string;
	date: Date;
}

const actualYear = new Date().getFullYear();
const actualMonth = new Date().getMonth();

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default function Home() {
	const logged: resultInfo = useAppSelector((state) => state.userInfo);
	const refresh = useAppSelector((state) => state.refreshNotes.refresh);
	const dispatch = useAppDispatch();
	const [notesList, setNotesList] = useState<notes[] | null>([]);
	const [actualDate, setActualDate] = useState(new Date());
	const [isLoading, setIsLoading] = useState(false);

	const location = useLocation();
	const render = location.state?.shouldRender;

	useEffect(() => {
		const authRaw = window.localStorage.getItem("SESSION_ID");

		if (authRaw) {
			setIsLoading(true);
			(async () => {
				const auth = await JSON.parse(authRaw);
				const URL = `${URLbackend}/api/notes`;

				const data = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${auth.token}`,
					},
				};

				try {
					const response = await fetch(URL, data);

					if (response.status === 200) {
						const res = await response.json();
						setNotesList(res);
						setIsLoading(false);
					} else {
						setIsLoading(false);
					}
				} catch (e) {
					console.error(e);
					setIsLoading(false);
				}
			})();
		} else {
			setNotesList(null);
		}

		const actualDate = new Date();

		setActualDate(actualDate);
	}, [refresh, logged, dispatch, render]);

	const getCurrentNotes = () => {
		let currentNoteExists = false;
		const toReturn = [];

		if (notesList && notesList.length > 0) {
			for (let i = 0; i < notesList.length; i++) {
				const resDate = new Date(notesList[i].date);

				if (
					resDate.getFullYear() === actualYear &&
					resDate.getMonth() === actualMonth
				) {
					currentNoteExists = true;
					break;
				}
			}

			currentNoteExists
				? notesList.map((result) => {
					const resDate = new Date(result.date);

					if (
						resDate.getFullYear() === actualYear &&
						resDate.getMonth() === actualMonth
					) {
						toReturn.push(
							<NotePreview
								note_id={result.note_id}
								title={result.title}
								priority={result.priority}
								text={result.text}
								redirect={result.note_id}
							/>,
						);
					}
				})
				: toReturn.push(<h1>No notes created this month...</h1>);
		} else {
			toReturn.push(<h1>No results...</h1>);
		}

		return toReturn;
	};

	return (
		<div className="home">
			<div className="home-welcome">
				{logged.ok ? (
					<h1>Welcome {logged.userInfo.username} !</h1>
				) : (
					<h1>Welcome anonymous !</h1>
				)}
			</div>
			<div className="home-notes-preview">
				{logged.ok ? (
					<div className="home-notes-preview__container">
						<div className="home-notes-preview__container__title">
							<h2>
								Notes preview -{" "}
								{monthNames[actualDate.getMonth()].substring(0, 3)}
								{"/"}
								{actualDate.getFullYear()}
							</h2>
						</div>
						<div
							className={
								!isLoading
									? "home-notes-preview__container__content"
									: "home-notes-preview__container__content-loading"
							}
						>
							{!isLoading ? (
								getCurrentNotes().map((res) => {
									return res;
								})
							) : (
								<Loading isLoading={isLoading} />
							)}
						</div>
					</div>
				) : (
					<div className="home-notes-preview__alert">
						<p>
							No user provided, so no online notes stored. Try making an account
							or login into one and create some notes.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
