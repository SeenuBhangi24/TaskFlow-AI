import { Routes, Route } from "react-router-dom";

// Import Pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import Ai from "./pages/Ai/Ai";
import Profile from "./pages/Profile/Profile";


function App() {

  return (

    <Routes>

      {/* Login Page */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* Register Page */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
          path="/projects"
          element={
              <Projects/>
          }
      />


      <Route
        path="/tasks"
        element={<Tasks />}
      />

      <Route
          path="/ai"
          element={<Ai />}
      />

      <Route
          path="/profile"
          element={<Profile />}
      />

    </Routes>

  );

}

export default App;