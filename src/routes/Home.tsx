import "../styles/Home.css";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotePreview from "../components/NotePreview";
import { URLbackend } from "../assets/URLs";

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

const defaultNote = {
  note_id: "id-example",
  title: "title-example",
  priority: 5,
  text: "text-example",
  date: new Date(),
};

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

  const location = useLocation();
  const render = location.state?.shouldRender;

  useEffect(() => {
    const authRaw = window.localStorage.getItem("SESSION_ID");

    if (authRaw) {
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
          const res = await response.json();

          if (response.ok) {
            setNotesList(res);
          } else {
            setNotesList([defaultNote]);
          }
        } catch (e) {
          console.error(e);
        }
      })();
    } else {
      setNotesList(null);
    }

    const actualDate = new Date();

    setActualDate(actualDate);
  }, [refresh, logged, dispatch, render]);

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
        {notesList !== null ? (
          <div className="home-notes-preview__container">
            <div className="home-notes-preview__container__title">
              <h2>
                Notes preview -{" "}
                {monthNames[actualDate.getMonth()].substring(0, 3)}
                {"/"}
                {actualDate.getFullYear()}
              </h2>
            </div>
            <div className="home-notes-preview__container__content">
              {notesList.map((result) => {
                const actualYear = new Date().getFullYear();
                const actualMonth = new Date().getMonth();
                const resDate = new Date(result.date);

                if (
                  resDate.getFullYear() === actualYear &&
                  resDate.getMonth() == actualMonth
                ) {
                  return (
                    <NotePreview
                      note_id={result.note_id}
                      title={result.title}
                      priority={result.priority}
                      text={result.text}
                      redirect={result.note_id}
                    />
                  );
                }
              })}
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
      <div></div>
    </div>
  );
}
