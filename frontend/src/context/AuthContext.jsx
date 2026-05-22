import {
    createContext,
    useContext,
    useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] =
        useState(() => {

            const storedUser =
                localStorage.getItem("user");

            return storedUser
                ? JSON.parse(storedUser)
                : null;

        });

    // LOGIN
    const login = (userData) => {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);

    };

    // LOGOUT
    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}

export function useAuth() {

    return useContext(AuthContext);

}