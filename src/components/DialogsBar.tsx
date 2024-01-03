import { useAppDispatch, useAppSelector } from "../hooks/store";
import { turnDialog, dialogToShow } from "../store/dialogDisplay";
import { refreshCount } from "../store/refreshNotes";
import "../styles/DialogsBar.css";

interface Props {
  title: string;
}

export default function DialogsBar({ title }: Props) {
  const dispatch = useAppDispatch();
  const refresh = useAppSelector((state) => state.refreshNotes.refresh);

  const handleExit = () => {
    dispatch(turnDialog(false));
    dispatch(dialogToShow(<></>));
    dispatch(refreshCount(refresh + 1));
  };

  return (
    <div className="dialogs-bar">
      <h2 className="dialogs-bar__title">{title}</h2>
      <button className="dialogs-bar__exit" onClick={handleExit}>
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
