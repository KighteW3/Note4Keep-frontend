import React from "react";
import "../styles/NotesNavBar.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { dialogToShow, turnDialog } from "../store/dialogDisplay";
import CreateNote from "./CreateNote";
import ConfirmDialog from "./ConfirmDialog";
import { refreshCount, refreshLog } from "../store/refreshNotes";
import { URLbackend } from "../assets/URLs";
import {
  CreateNoteIcon,
  DeleteIcon,
  FiltersIcon,
  RefreshIcon,
} from "../assets/Icons";

interface FormStructure extends HTMLFormElement {
  search: { value: string };
}

export default function NotesNavBar() {
  const refresh = useAppSelector((state) => state.refreshNotes.refresh);
  const dispatch = useAppDispatch();
  const dialogTurn = useAppSelector((state) => state.dialogDisplay.turn);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<FormStructure>) => {
    e.preventDefault();

    const searchQuery = e.currentTarget.search.value;
    console.log(searchQuery);

    dispatch(refreshCount(refresh + 1));
    if (searchQuery == "" || !searchQuery) {
      navigate("../notes/", { replace: true });
    } else {
      navigate(`../notes/search/${searchQuery}`, { replace: true });
    }
  };

  const WriteNote = () => {
    if (!dialogTurn) {
      dispatch(turnDialog(true));
      dispatch(dialogToShow(<CreateNote />));
    }
  };

  const handleDelete = () => {
    const deleteNotes = async () => {
      const URL = `${URLbackend}/api/notes/delete-all-notes`;
      const authRaw = window.localStorage.getItem("SESSION_ID");

      if (authRaw) {
        const auth = JSON.parse(authRaw);

        const data = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
          },
        };

        try {
          const result = await fetch(URL, data);
          //const res = await result.json();

          dispatch(refreshLog(result.statusText));
          dispatch(refreshCount(refresh + 1));
          window.scrollTo(0, 0);
        } catch (e) {
          console.error(e);
        }
      } else {
        console.error("No auth.");
      }
    };

    if (!dialogTurn) {
      dispatch(turnDialog(true));
      dispatch(
        dialogToShow(
          <ConfirmDialog
            question="Are you sure about deleting all notes from account?"
            action={deleteNotes}
          />,
        ),
      );
    }
  };

  const handleRefresh = () => {
    dispatch(refreshCount(refresh + 1));
  };

  return (
    <nav className="notes-nav">
      <div className="notes-nav__bar">
        <form className="notes-nav__bar__form" onSubmit={handleSubmit}>
          <input
            id="notes-nav__bar__form__search"
            type="search"
            placeholder="Search for your notes here..."
            name="search"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input id="notes-nav__bar__form__submit" type="submit" value="" />
          </button>
        </form>

        <div className="notes-nav__bar__buttons">
          <div className="notes-nav__bar__buttons__button notes-nav__bar__buttons__refresh">
            <button onClick={handleRefresh}>
              <RefreshIcon />
            </button>
          </div>
          <div className="notes-nav__bar__buttons__button notes-nav__bar__buttons__delete">
            <button onClick={handleDelete}>
              <DeleteIcon />
            </button>
          </div>
          <div className="notes-nav__bar__buttons__button notes-nav__bar__buttons__filters">
            <button>
              <FiltersIcon />
            </button>
          </div>
          <div className="notes-nav__bar__buttons__button notes-nav__bar__buttons__write">
            <button onClick={WriteNote}>
              <CreateNoteIcon />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
