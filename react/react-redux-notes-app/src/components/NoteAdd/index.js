import { useState } from "react";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/notes/notesSlice";
import { nanoid } from "@reduxjs/toolkit";

function NoteAdd() {
  const [color1, setColor1] = useState(true);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);
  const [color4, setColor4] = useState(false);
  const [color5, setColor5] = useState(false);
  const [note, setNote] = useState("");
  const [color, setColor] = useState("rgb(247, 13, 125)");

  const dispatch = useDispatch();

  function noteColor(colorNumber) {
    switch (colorNumber) {
      case 1: {
        setColor1(true);
        setColor2(false);
        setColor3(false);
        setColor4(false);
        setColor5(false);
        setColor("rgb(247,13,125)");
        break;
      }

      case 2: {
        setColor1(false);
        setColor2(true);
        setColor3(false);
        setColor4(false);
        setColor5(false);
        setColor("rgb(253,133,0)");

        break;
      }
      case 3: {
        setColor1(false);
        setColor2(false);
        setColor3(true);
        setColor4(false);
        setColor5(false);
        setColor("rgb(244,250,4)");

        break;
      }
      case 4: {
        setColor1(false);
        setColor2(false);
        setColor3(false);
        setColor4(true);
        setColor5(false);
        setColor("rgb(138,243,72)");
        break;
      }
      case 5: {
        setColor1(false);
        setColor2(false);
        setColor3(false);
        setColor4(false);
        setColor5(true);
        setColor("rgb(3,144,217)");
        break;
      }
      default:
        break;
    }
  }

  const handleClick = () => {
    if (note === "") {
      alert("Please enter note!");
    } else {
      dispatch(addNote({ id: nanoid(), note, color }));
    }
    setNote("");
  };

  return (
    <div className={styles.textareaContainer}>
      <textarea
        placeholder="Enter your note here..."
        value={note}
        className={styles.textarea}
        style={{
          backgroundColor: color1
            ? "rgb(247,13,125)"
            : color2
            ? "rgb(253,133,0)"
            : color3
            ? "rgb(244,250,4)"
            : color4
            ? "rgb(138,243,72)"
            : color5 && "rgb(3,144,217)",
          color: "white",
          transition: "all 1s",
        }}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <div className={styles.colors}>
        <span
          className={styles.color}
          style={{ color: "rgb(247,13,125)", opacity: color1 && 1 }}
          onClick={() => noteColor(1)}
        >
          <i className="fa-solid fa-file-lines fa-2xl"></i>
        </span>
        <span
          className={styles.color}
          style={{ color: "rgb(253,133,0)", opacity: color2 && 1 }}
          onClick={() => noteColor(2)}
        >
          <i className="fa-solid fa-file-lines fa-2xl"></i>
        </span>
        <span
          className={styles.color}
          style={{ color: "rgb(244,250,4)", opacity: color3 && 1 }}
          onClick={() => noteColor(3)}
        >
          <i className="fa-solid fa-file-lines fa-2xl"></i>
        </span>
        <span
          className={styles.color}
          style={{ color: "rgb(138,243,72)", opacity: color4 && 1 }}
          onClick={() => noteColor(4)}
        >
          <i className="fa-solid fa-file-lines fa-2xl"></i>
        </span>
        <span
          className={styles.color}
          style={{ color: "rgb(3,144,217)", opacity: color5 && 1 }}
          onClick={() => noteColor(5)}
        >
          <i className="fa-solid fa-file-lines fa-2xl"></i>
        </span>
      </div>
      <span
        className={styles.colorPin}
        style={{ color: "rgb(44,44,44)" }}
        onClick={handleClick}
      >
        <i className="fa-solid fa-thumbtack fa-3x"></i>
      </span>
    </div>
  );
}

export default NoteAdd;
