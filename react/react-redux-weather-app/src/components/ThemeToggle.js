import React from "react";
import { Radio } from "semantic-ui-react";

function ThemeToggle({ darkMode, setDarkMode }) {
  const myStyle = {
    padding: "1vh",
    fontWeight: "800",
    textAlign: "center",
  };
  return (
    <div style={myStyle}>
      <label onClick={() => setDarkMode(!darkMode)}>
        {" "}
        {darkMode ? "Light Mode" : "Dark Mode"}<Radio toggle />{"  "}
      </label>
    </div>
  );
}

export default ThemeToggle;
