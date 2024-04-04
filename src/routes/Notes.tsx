import { useEffect, useState } from "react";
import "../styles/Notes.css";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import NotesNavBar from "../components/NotesNavBar";
import NotePreview from "../components/NotePreview";
import NotePageNav from "../components/NotePageNav";
import Loading from "../components/Loading";
import { useAppSelector } from "../hooks/store";
import { URLbackend } from "../assets/URLs";

export interface Note {
	note_id: string;
	title: string;
	priority: number;
	text: string;
	date: Date;
}

const noteExample = {
	note_id: "id example",
	title: "title example",
	priority: 0,
	text: "text example",
	date: new Date(),
};

const URL = `${URLbackend}/api/notes`;

export default function Notes() {
	const refresh = useAppSelector((state) => state.refreshNotes.refresh);
	const [notesList, setNotesList] = useState<Note[]>([]);
	const [notePageOrd, setNotePageOrd] = useState<Note[][]>([[noteExample]]);
	const [isRoot, setIsRoot] = useState<boolean>(true);
	const [numPageToUse, setNumPageToUse] = useState<number>(0);
	const { numPage } = useParams();
	const { state } = useLocation();
	const [returnNotes, setReturnNotes] = useState<JSX.Element>();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const authRaw = window.localStorage.getItem("SESSION_ID");

		if (authRaw) {
			setIsLoading(true);

			(async () => {
				const auth = await JSON.parse(authRaw);

				const data = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${auth.token}`,
					},
				};

				try {
					const result = await fetch(URL, data);

					if (result.status === 200) {
						const res = await result.json();
						setNotesList(res);
						setIsLoading(false);
					} else if (result.status === 204) {
						setNotesList([noteExample]);
						setIsLoading(false);
					}
				} catch (e) {
					console.error(e);
					setIsLoading(false);
				}
			})();
		} else {
			console.error("No auth provided");
			navigate("../users/register", { replace: true });
		}

		window.scrollTo(0, 0);
	}, [refresh, navigate]);

	useEffect(() => {
		const numOfPages =
			notesList && notesList.length > 0
				? Math.ceil(notesList.length / 28)
				: null;

		const notesPages = [];

		if (numOfPages) {
			for (let i = 0; i < numOfPages; i++) {
				if (i > 0) {
					const a = 28 * i;
					const b = a + 28;

					const c = [];

					for (let j = a; j < b; j++) {
						if (notesList[j]) {
							c.push(notesList[j]);
						}
					}

					notesPages.push(c);
				} else {
					const a = [];
					for (let j = 0; j < 28; j++) {
						if (notesList[j]) {
							a.push(notesList[j]);
						}
					}

					notesPages.push(a);
				}
			}
		}

		setNotePageOrd(notesPages);
	}, [notesList, refresh]);

	useEffect(() => {
		const a = numPage ? Number.parseInt(numPage) - 1 : 0;
		setNumPageToUse(a);

		setIsRoot(
			window.location.pathname.startsWith("/notes") &&
				!window.location.pathname.includes("search" || "id")
				? true
				: false,
		);
	}, [numPage, state, refresh]);

	useEffect(() => {
		if (isRoot) {
			if (notePageOrd[numPageToUse] && notesList && notesList.length > 0) {
				setReturnNotes(
					<div className="notes-main__notes-container">
						<div className="notes-main__notes-container__content">
							{notePageOrd[numPageToUse].map((result) => {
								return (
									<NotePreview
										note_id={result.note_id}
										title={result.title}
										priority={result.priority}
										text={result.text}
										redirect={result.note_id}
									/>
								);
							})}
						</div>
						<NotePageNav
							numPageInt={numPageToUse}
							notesList={notesList || []}
							toUrl={["general", window.location.pathname.toString()]}
						/>
					</div>,
				);
			} else {
				setReturnNotes(<Loading isLoading={isLoading} />);
			}
		} else {
			setReturnNotes(<Outlet />);
		}
	}, [isRoot, notePageOrd, notesList, numPageToUse, refresh, isLoading]);

	return (
		<>
			<div className="notes-main">
				<NotesNavBar />
				{returnNotes}
			</div>
		</>
	);
}
