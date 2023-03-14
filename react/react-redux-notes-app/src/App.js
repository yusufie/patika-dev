import "./App.css";
import Header from "./components/Header";
import NoteAdd from "./components/NoteAdd";
import Notes from "./components/Notes";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <NoteAdd />
      <Notes />
    </div>
  );
}

export default App;
