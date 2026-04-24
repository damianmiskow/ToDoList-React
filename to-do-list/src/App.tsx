import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { HomePage } from "./assets/pages/HomePage/HomePage";
import { DetailsPage } from "./assets/pages/DetailsPage";
import { todoList as initialData } from "./data/tasks";
import { Register } from "./assets/pages/Authorization/Register";
import { useState } from "react";
import { Login } from "./assets/pages/Authorization/Login";
import { ProtectedRoute } from "./assets/pages/ProtectedRoute";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

function App() {
  const [tasks, setTasks] = useState(initialData);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage tasks={tasks} setTasks={setTasks} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <DetailsPage tasks={tasks} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
