import React from "react";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/notes/notesSlice";

function Search() {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search"
      className={styles.input}
      onChange={(e) => handleChange(e)}
    />
  );
}

export default Search;
