import "./App.css";
import { Routes, Route } from "react-router";
import { HomePage } from "./assets/pages/HomePage/HomePage";
import { DetailsPage } from "./assets/pages/DetailsPage";
import { todoList as initialData } from "./data/tasks";
import { Register } from "./assets/pages/Authorization/Register";
import { useState } from "react";
import { Login } from "./assets/pages/Authorization/Login";

function App() {
  const [tasks, setTasks] = useState(initialData);

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage tasks={tasks} setTasks={setTasks} />}
      ></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/task/:id" element={<DetailsPage tasks={tasks} />}></Route>
    </Routes>
  );
}

export default App;
