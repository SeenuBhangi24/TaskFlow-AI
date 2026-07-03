import { createContext, useState } from "react";

// Create Context
const AuthContext = createContext();

// Provider Component
function AuthProvider({ children }) {

    // Store Logged-in User
    const [user, setUser] = useState(null);

    // Store JWT Token
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    // Login Function
    function login(userData, jwtToken) {

        setUser(userData);

        setToken(jwtToken);

        localStorage.setItem("token", jwtToken);

    }

    // Logout Function
    function logout() {

        setUser(null);

        setToken("");

        localStorage.removeItem("token");

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                setUser,
                setToken,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export { AuthProvider, AuthContext };