import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table from "./Components/Table";
import ToDo from "./Components/ToDo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/table" element={<Table />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
