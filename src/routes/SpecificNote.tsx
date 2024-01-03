import { useNavigate, useParams } from "react-router-dom";
import "../styles/SpecificNote.css";
import { BackIcon, CheckIcon, DeleteIcon, UndoIcon } from "../assets/Icons";
import { URLbackend, URLFrontend } from "../assets/URLs";
import { NavLink } from "../components/NavLink";
import { useEffect, useState } from "react";
import { Note } from "./Notes";
import { refreshCount, refreshLog } from "../store/refreshNotes";
import { useAppSelector } from "../hooks/store";
import { useDispatch } from "react-redux";
import { dialogToShow, turnDialog } from "../store/dialogDisplay";
import ConfirmDialog from "../components/ConfirmDialog";

const URL = `${URLbackend}/api/notes/spec-note`;

export default function SpecificNote() {
  const dispatch = useDispatch();
  const refresh = useAppSelector((state) => state.refreshNotes.refresh);
  const dialogTurn = useAppSelector((state) => state.dialogDisplay.turn);
  const { noteId } = useParams();
  const [noteContent, setNoteContent] = useState<Note>();
  const [optionsList, setOptionsList] = useState([<></>]);
  const navigate = useNavigate();

  useEffect(() => {
    const authRaw = window.localStorage.getItem("SESSION_ID");

    if (authRaw) {
      const auth = JSON.parse(authRaw);

      (async () => {
        const data = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            note_id: noteId,
          }),
        };

        try {
          const result = await fetch(URL, data);
          if (result.ok) {
            const res = await result.json();
            setNoteContent(res);
          } else {
            throw "Problem getting note content";
          }
        } catch (e) {
          console.error(e);
        }
      })();
    } else {
      console.error("No login token");
    }
  }, [noteId]);

  useEffect(() => {
    const individualOptionList = [];

    if (noteContent) {
      for (let i = 1; i <= 5; i++) {
        if (i && i === 2 && i !== noteContent.priority) {
          individualOptionList.push(
            <option key={i} value={2}>
              {2} {"(Default)"}
            </option>,
          );
        } else if (i && i === noteContent.priority) {
          const x = noteContent.priority;

          individualOptionList.push(
            <option key={i} value={x} selected>
              {x}
              {noteContent.priority === 2 ? " (Default)" : ""}
            </option>,
          );
        } else {
          individualOptionList.push(
            <option key={i} value={i}>
              {i}
            </option>,
          );
        }
      }
    }

    setOptionsList(individualOptionList);
  }, [noteContent]);

  const handleDelete = () => {
    const deleteNote = async () => {
      const URL = `${URLbackend}/api/notes/delete-spec-note`;
      const authRaw = window.localStorage.getItem("SESSION_ID");

      if (!noteContent || !noteContent.note_id) {
        console.error("Error: No note_id to query.");
      }

      if (authRaw && noteContent && noteContent.note_id) {
        const auth = JSON.parse(authRaw);

        const data = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            note_id: noteContent.note_id,
          }),
        };

        try {
          const result = await fetch(URL, data);
          //const res = await result.json();

          if (result.ok) {
            dispatch(refreshLog(result.statusText));
            dispatch(refreshCount(refresh + 1));
            window.scrollTo(0, 0);
            navigate("../notes/", { replace: true });
          } else {
            console.error(result.statusText);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        console.error("No auth b");
      }
    };

    if (!dialogTurn) {
      dispatch(turnDialog(true));
      dispatch(
        dialogToShow(
          <ConfirmDialog
            question="Are you sure about deleting this note?"
            action={deleteNote}
          />,
        ),
      );
    }
  };

  function NoteContent() {
    if (noteContent) {
      return (
        <>
          <em>
            <b>ID:</b> {noteContent.note_id}
          </em>
          <form>
            <div>
              <input
                type="text"
                placeholder="Insert the note title"
                defaultValue={noteContent.title}
                name="title"
              />
              <select name="priority">
                {optionsList.map((result) => {
                  return result;
                })}
              </select>
            </div>
            <pre>
              <textarea
                name="text"
                required
                defaultValue={noteContent.text}
              ></textarea>
            </pre>
          </form>
        </>
      );
    }
  }

  return (
    <div className="specific-note">
      <div className="specific-note__util-bar">
        <div className="specific-note__util-bar__back">
          <NavLink to={`${URLFrontend}${history.state.usr}`}>
            <BackIcon />
          </NavLink>
        </div>
        <div className="specific-note__util-bar__buttons">
          <div className="specific-note__util-bar__buttons__update">
            <CheckIcon />
          </div>
          <div className="specific-note__util-bar__buttons__undo">
            <UndoIcon />
          </div>
          <div
            className="specific-note__util-bar__buttons__delete"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div className="specific-note__box">
        <NoteContent />
      </div>
    </div>
  );
}
