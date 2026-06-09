import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateForm from "./pages/CreateForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/forms" />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/forms"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/forms/create"
          element={
            <ProtectedRoute>
              <CreateForm />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/form/:slug" element={<h1>Public Form</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
