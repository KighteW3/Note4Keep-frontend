import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotePreview from "../components/NotePreview";
import type { Note } from "./Notes";
import "../styles/SearchNotes.css";
import NotePageNav from "../components/NotePageNav";
import { useAppSelector } from "../hooks/store";
import { URLbackend } from "../assets/URLs";
import Loading from "../components/Loading";

const noteExample = {
	note_id: "id example",
	title: "title example",
	priority: 0,
	text: "text example",
	date: new Date(),
};

const URL = `${URLbackend}/api/notes/some-note`;

export default function SearchNotes() {
	const { searchQuery, numPage } = useParams();
	const [notesList, setNotesList] = useState<Note[]>([noteExample]);
	const [notePageOrd, setNotePageOrd] = useState<Note[][]>([[noteExample]]);
	const [numPageToUse, setNumPageToUse] = useState<number>(0);
	const navigate = useNavigate();
	const refresh = useAppSelector((state) => state.refreshNotes.refresh);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const token = window.localStorage.getItem("SESSION_ID");

		setIsLoading(true);
		(async () => {
			if (token) {
				const tokenDecoded = JSON.parse(token);

				const data = {
					method: "POST",
					headers: {
						"content-type": "application/json",
						authorization: `Bearer ${tokenDecoded.token}`,
					},
					body: JSON.stringify({
						note_phrase: searchQuery,
					}),
				};

				try {
					const result = await fetch(URL, data);

					if (result.status === 200) {
						const res = await result.json();
						setNotesList(res);
						setIsLoading(false);
					} else if (result.status === 204) {
						setNotesList([]);
						setIsLoading(false);
					}
				} catch (e) {
					console.error(e);
					setIsLoading(false);
				}
			}
		})();

		if (
			searchQuery === "" ||
			window.location.pathname === "/notes/search/" ||
			!searchQuery
		) {
			navigate("../notes/", { replace: true });
		}
	}, [searchQuery, navigate, refresh]);

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

		if (notesList) {
			setNotePageOrd(notesPages);
		}
	}, [notesList, refresh, searchQuery]);

	useEffect(() => {
		const a = numPage ? parseInt(numPage) - 1 : 0;

		setNumPageToUse(a);
	}, [numPage, notePageOrd, refresh, searchQuery]);

	return (
		<div className="search-notes">
			<div className="search-notes__content">
				<div className="search-notes__content__container">
					{isLoading ? (
						<Loading isLoading={isLoading} />
					) : notesList && notePageOrd[numPageToUse] ? (
						notePageOrd[numPageToUse].map((result) => {
							return (
								<NotePreview
									note_id={result.note_id}
									title={result.title}
									priority={result.priority}
									text={result.text}
									redirect={result.note_id}
								/>
							);
						})
					) : (
						<>No results...</>
					)}
				</div>
				<NotePageNav
					numPageInt={numPageToUse}
					notesList={notesList || [noteExample]}
					toUrl={[
						"search",
						window.location.pathname.toString(),
						searchQuery || "",
					]}
				/>
			</div>
		</div>
	);
}
