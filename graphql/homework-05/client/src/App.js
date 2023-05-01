import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EventDetail from "./pages/EventDetailPage";
import Page404 from "./pages/Page404";
import NewEvent from "./pages/NewEvent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="event">
        <Route path=":id" element={<EventDetail />} />
      </Route>
      <Route path="/addevent" element={<NewEvent />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;