import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table from "./Components/Table";
import ToDo from "./Components/ToDo";
import ToDoLIst from "./Components/ToDoLIst";
import EligibilityCheck from "./Components/EligibilityCheck";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/table" element={<Table />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/todoList" element={<ToDoLIst />} />
          <Route path="/EligibilityCheck" element={<EligibilityCheck />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
