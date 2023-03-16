import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";

import Confetti from "./components/Confetti";

function App() {
  return (
    <>
      <Confetti />
      <div className="container min-w-[640px] max-w-[768px] mx-auto mt-12">
        <Header />
        <Content />
      </div>
    </>
  );
}

export default App;
