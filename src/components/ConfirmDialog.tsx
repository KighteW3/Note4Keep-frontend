import "../styles/ConfirmDialog.css";
import DialogsBar from "./DialogsBar";
import { useDispatch } from "react-redux";
import { turnDialog, dialogToShow } from "../store/dialogDisplay";
import { refreshCount } from "../store/refreshNotes";
import { useAppSelector } from "../hooks/store";

interface ConfirmDialog {
  question: string;
  action: () => Promise<void>;
}

export default function ConfirmDialog({ question, action }: ConfirmDialog) {
  const refresh = useAppSelector((state) => state.refreshNotes.refresh);
  const dispatch = useDispatch();

  const confirmed = () => {
    action();
    dispatch(turnDialog(false));
    dispatch(dialogToShow(<></>));
    dispatch(refreshCount(refresh + 1));
  };

  const nonConfirm = () => {
    dispatch(turnDialog(false));
    dispatch(dialogToShow(<></>));
    dispatch(refreshCount(refresh + 1));
  };

  return (
    <div className="confirm-dialog">
      <DialogsBar title="Confirm" />
      <div className="confirm-dialog__container">
        <h2 className="confirm-dialog__container__question">{question}</h2>
        <div className="confirm-dialog__container__options">
          <button
            onClick={nonConfirm}
            className="confirm-dialog__container__options__button confirm-dialog__container__options__cancel"
          >
            No
          </button>
          <button
            onClick={confirmed}
            className="confirm-dialog__container__options__button confirm-dialog__container__options__confirm"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
