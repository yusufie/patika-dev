import { useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotes,
  selectFilterText,
  selectFilteredNotes,
} from "../../redux/notes/notesSlice";
import { editNote, deleteNote } from "../../redux/notes/notesSlice";

function Notes() {
  const notes = useSelector(selectNotes);

  const filterText = useSelector(selectFilterText);
  const filteredNotes = useSelector(selectFilteredNotes);
  const dispatch = useDispatch();
  const [isTextarea, setIsTextArea] = useState(false);
  const [editText, setEditText] = useState(notes.note);

  const handleChange = (id, e) => {
    dispatch(editNote({ id: id, note: e.target.value }));
  };
  const handleClick = (id) => {
    dispatch(deleteNote({ id: id }));
  };

  return (
    <div className={styles.notesContainer}>
      {filteredNotes
        .slice(0)
        .reverse()
        .map((note) => (
          <div id="note" className={styles.note} key={note.id}>
            <div className={styles.pin}>
              <i
                class="fa-solid fa-trash-alt"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(note.id)}
              ></i>
            </div>

            <textarea
              id="textarea"
              style={{
                backgroundColor: note.color,
                position: "absolute",
                top: "0",
                zIndex: isTextarea && "4000",
              }}
              className={styles.noteInner}
              onChange={(e) => handleChange(note.id, e)}
              value={editText}
            >
              {note.note}
            </textarea>

            <div
              style={{
                backgroundColor: note.color,
                position: "absolute",
                top: "0",
              }}
              className={styles.noteInner}
              onClick={() => {
                setIsTextArea(true);
                document.getElementById("textarea").focus();
              }}
            >
              {note.note}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Notes;
