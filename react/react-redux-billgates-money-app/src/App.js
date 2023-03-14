import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Table from "./components/Table";

function App() {
  return (
    <div className="App" style={{textAlign: "center" , margin: "1rem" }}>
      <Header />
      <Table />
      <Footer />
    </div>
  );
}

export default App;
