import "../styles/NotePageNav.css";
import type { Note } from "../routes/Notes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { refreshCount } from "../store/refreshNotes";

interface PageNavProps {
  numPageInt: number;
  notesList: Note[] | Note[][];
  toUrl: string[];
}

export default function NotePageNav({
  numPageInt,
  notesList,
  toUrl,
}: PageNavProps) {
  const refresh = useAppSelector((state) => state.refreshNotes.refresh);
  const dispatch = useAppDispatch();
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const numPage = numPageInt + 1;
  const notesListLength = notesList.length;
  const [backPage, setBackPage] = useState<string>("/notes");
  const [backStyle, setBackStyle] = useState<string>("note-page-nav__link-on");
  const [nextPage, setNextPage] = useState<string>("/notes");
  const [nextStyle, setNextStyle] = useState<string>("note-page-nav__link-on");

  useEffect(() => {
    if (notesList && notesList.length > 0 && notesListLength) {
      const totalPages = Math.ceil(notesListLength / 28);
      setNumOfPages(totalPages);
    }
  }, [notesList, notesListLength]);

  useEffect(() => {
    if (toUrl[0] === "general") {
      if (numPage > 1) {
        setBackStyle("note-page-nav__link-on");
        setBackPage(`/notes/${numPageInt}`);
      } else {
        setBackPage(toUrl[1]);
        setBackStyle("note-page-nav__link-off");
      }

      if (numPage < numOfPages) {
        setNextStyle("note-page-nav__link-on");
        setNextPage(`/notes/${numPage + 1}`);
      } else {
        setNextPage(toUrl[1]);
        setNextStyle("note-page-nav__link-off");
      }
    } else if (toUrl[0] === "search") {
      if (numPage > 1) {
        setBackStyle("note-page-nav__link-on");
        setBackPage(`/notes/search/${numPage - 1}/${toUrl[2]}`);
      } else {
        setBackPage(toUrl[1]);
        setBackStyle("note-page-nav__link-off");
      }

      if (numPage < numOfPages) {
        setNextStyle("note-page-nav__link-on");
        setNextPage(`/notes/search/${numPage + 1}/${toUrl[2]}`);
      } else {
        setNextPage(toUrl[1]);
        setNextStyle("note-page-nav__link-off");
      }
    }
  }, [numOfPages, numPage, numPageInt, toUrl]);

  const handleClick = () => {
    dispatch(refreshCount(refresh + 1));
  };

  return (
    <>
      <div className="note-page-nav-container">
        <nav className="note-page-nav">
          <Link onClick={handleClick} className={backStyle} to={backPage}>
            Anterior
          </Link>
          <div>
            {numPage} de {numOfPages}
          </div>
          <Link onClick={handleClick} className={nextStyle} to={nextPage}>
            Siguiente
          </Link>
        </nav>
      </div>
    </>
  );
}
