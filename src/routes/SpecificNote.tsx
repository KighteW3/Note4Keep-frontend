import { useNavigate, useParams } from "react-router-dom";
import "../styles/SpecificNote.css";
import { BackIcon, CheckIcon, DeleteIcon, UndoIcon } from "../assets/Icons";
import { URLbackend, URLFrontend } from "../assets/URLs";
import { NavLink } from "../components/NavLink";
import { FormEvent, useEffect, useState } from "react";
import { Note } from "./Notes";
import { refreshCount, refreshLog } from "../store/refreshNotes";
import { useAppSelector } from "../hooks/store";
import { useDispatch } from "react-redux";
import { dialogToShow, turnDialog } from "../store/dialogDisplay";
import ConfirmDialog from "../components/ConfirmDialog";
import { Form } from "../components/CreateNote";
import Loading from "../components/Loading";

const URL = `${URLbackend}/api/notes/spec-note`;

interface noteData {
  title: string,
  priority: number,
  text: string,
}

const noteDataDefault = {
  title: "",
  priority: 0,
  text: "",
}

export default function SpecificNote() {
  const dispatch = useDispatch();
  const refresh = useAppSelector((state) => state.refreshNotes.refresh);
  const dialogTurn = useAppSelector((state) => state.dialogDisplay.turn);
  const { noteId } = useParams();
  const [noteContent, setNoteContent] = useState<Note>();
  const [optionsList, setOptionsList] = useState([<></>]);
  const navigate = useNavigate();
  const [firstState, setFirstState] = useState<noteData>(noteDataDefault);
  const [postState, setPostState] = useState<noteData>(noteDataDefault);
  const [undoClass, setUndoClass] = useState("specific-note__util-bar__buttons__undo");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const authRaw = window.localStorage.getItem("SESSION_ID");

    if (authRaw) {
      const auth = JSON.parse(authRaw);

      setIsLoading(true);
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
            setFirstState({
              title: res.title,
              priority: res.priority,
              text: res.text,
            })
            setPostState({
              title: res.title,
              priority: res.priority,
              text: res.text,
            })
            setIsLoading(false);
          } else {
            setIsLoading(false);
            throw "Problem getting note content";
          }
        } catch (e) {
          console.error(e);
          setIsLoading(false);
        }
      })();
    } else {
      console.error("No login token");
    }
  }, [noteId]);

  /* useEffect(() => {
    console.log(firstState);
  }, [firstState]) */

  useEffect(() => {
    const individualOptionList = [];

    if (noteContent) {
      for (let i = 1; i <= 5; i++) {
        if (i && i === 2 && i !== noteContent.priority) {
          individualOptionList.push(
            <option key={i} value={2}>
              {2} {"(Default)"}
            </option>
          );
        } else if (i && i === noteContent.priority) {
          const x = noteContent.priority;

          individualOptionList.push(
            <option key={i} value={x} selected>
              {x}
              {noteContent.priority === 2 ? " (Default)" : ""}
            </option>
          );
        } else {
          individualOptionList.push(
            <option key={i} value={i}>
              {i}
            </option>
          );
        }
      }
    }

    setOptionsList(individualOptionList);
  }, [noteContent]);

  useEffect(() => {
    if (JSON.stringify(postState) !== JSON.stringify(firstState)) {
      setUndoClass("specific-note__util-bar__buttons__undo-active");
    } else {
      if (undoClass.endsWith("active")) {
        setUndoClass("specific-note__util-bar__buttons__undo");
      }
    }

    console.log(undoClass);
  }, [postState, firstState, undoClass])

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {

    console.log(`Estado de postState anterior: ${JSON.stringify(postState)}`);
    let res = {
      title: "",
      priority: 0,
      text: "",
    };

    let prio = 0;

    switch (event.target.name) {
      case "title":
        res = {
          title: event.target.value,
          priority: postState.priority,
          text: postState.text,
        };
        break;
      case "priority":
        try {
          prio = parseInt(event.target.value);
        } catch (e) {
          console.error("Cannot parse priority input", e);
        }
        res = {
          title: postState.title,
          priority: prio,
          text: postState.text,
        };
        break;
      case "text":
        res = {
          title: postState.title,
          priority: postState.priority,
          text: event.target.value,
        };
        break;
      default:
        res = {
          title: postState.title,
          priority: postState.priority,
          text: postState.text,
        };
        console.error("Error, invalid form element name");
    }

    setPostState(res);
  }

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as typeof event.target & Form;

    const title = form.title.value;

    const priorityString = form.priority.value;
    let priority: number = 0;

    try {
      priority = parseInt(priorityString);
    } catch (e) {
      console.error("Error" + e);
      priority = 2;
    }

    if (!priority) {
      console.error("Error: invalid priority field");
    }

    const text = form.text.value;

    const token = window.localStorage.getItem("SESSION_ID");

    if (token) {
      const tokenDecoded = JSON.parse(token);

      const data = {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenDecoded.token}`,
        },
        body: JSON.stringify({
          note_id: noteId,
          title: title,
          priority: priority,
          text: text,
        }),
      };

      const URL = `${URLbackend}/api/notes/update-note`;

      try {
        const response = await fetch(URL, data);
        const resParsed = await response.json();

        if (response.ok) {
          dispatch(refreshLog(response.statusText));
          window.scrollTo(0, 0);
        } else {
          console.error(resParsed.error);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      window.open(`${URLFrontend}/`);
    }
  };

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
          />
        )
      );
    }
  };


  let form = (<></>);
  if (noteContent) {
    form = (
      <div className="specific-note__box__content">
        <div className="specific-note__box__content__id">
          <em>
            <b>ID:</b> {noteContent.note_id}
          </em>
        </div>
        <form className="specific-note__box__content__form" id="update-form" onSubmit={handleUpdate}
          onInput={handleFormChange}>
          <div>
            <input
              type="text"
              placeholder="Insert the note title"
              defaultValue={noteContent.title}
              name="title"
              id="pito"
              required
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
      </div>
    );
  } else {
    form = (<>
      <span>The note has no content.</span>
    </>)
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
            <input type="submit" id="submit-loco" form="update-form" value="" />
          </div>
          <div className={undoClass}>
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
        {!isLoading ? form : <Loading isLoading={isLoading} />}
      </div>
    </div>
  );
}
