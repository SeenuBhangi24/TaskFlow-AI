import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Import Auth Provider
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <BrowserRouter>

      {/* Provide Authentication Context to the Entire App */}
      <AuthProvider>

        <App />

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);