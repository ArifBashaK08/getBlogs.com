import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types"


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const getText = (html) => {
        const text = new DOMParser().parseFromString(html, "text/html")
        return text.body.textContent
      }

    const navigationKeys = [
        { catName: "Art", catLink: "/?cat=art" },
        { catName: "Science", catLink: "/?cat=science" },
        { catName: "Technology", catLink: "/?cat=technology" },
        { catName: "Entertainment", catLink: "/?cat=entertainment" },
        { catName: "Design", catLink: "/?cat=design" },
        { catName: "Food", catLink: "/?cat=food" },
    ]

    const userLogin = async (formData) => {
        try {
            const response = await axios.post("/api/auth/signin", formData);
            response.status === 200 ? setCurrentUser(response.data) : null;
            return response
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const userLogout = async () => {
        try {
            await axios.post("/api/auth/signout");
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    
    return (
        <AuthContext.Provider value={{ currentUser, userLogin, userLogout, navigationKeys, getText }}>
            {children}
        </AuthContext.Provider>
    );
    
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};