import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types"


export const ContextStore = createContext();

export const ContextStoreProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([])
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const getText = (html) => {
        const text = new DOMParser().parseFromString(html, "text/html")
        return text.body.textContent
    }

    const navigationKeys = [
        {
            catName: "Art",
            catLink: "/all-blogs/?cat=art",
            catImg: "https://d7hftxdivxxvm.cloudfront.net/?height=334&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FX0rIxslkwBH8agfzWhY_zg%2Flarger.jpg&width=445"
        },
        {
            catName: "Design", catLink: "/all-blogs/?cat=design",
            catImg: "https://img.freepik.com/free-photo/abstract-glowing-flame-drops-electric-illumination-generative-ai_188544-8092.jpg"

        },
        {
            catName: "Entertainment",
            catLink: "/all-blogs/?cat=entertainment",
            catImg: "https://static8.depositphotos.com/1052036/799/v/950/depositphotos_7991018-stock-illustration-bucket-full-of-entertainment.jpg"

        },
        {
            catName: "Food",
            catLink: "/all-blogs/?cat=food",
            catImg: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg"
        },
        {
            catName: "Science",
            catLink: "/all-blogs/?cat=science",
            catImg: "https://as2.ftcdn.net/v2/jpg/05/79/64/29/1000_F_579642932_z3CUhYjjYWcGIWJtO30pMyYVFpDyoa1W.jpg"
        },
        {
            catName: "Study",
            catLink: "/all-blogs/?cat=study",
            catImg: "https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-ladders-education-day_23-2149241014.jpg?w=360&t=st=1723218787~exp=1723219387~hmac=4f07be06867d3d7fb0d5d66aaee7e61c7ecc7c60b8d1b49aa64d9da30afd8b92"
        },
        {
            catName: "Technology",
            catLink: "/all-blogs/?cat=technology",
            catImg: "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg"
        },
        {
            catName: "Travel",
            catLink: "/all-blogs/?cat=travel",
            catImg: "https://img.freepik.com/free-photo/view-travel-items-assortment-still-life_23-2149617645.jpg"

        },
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
        <ContextStore.Provider value={{ currentUser, userLogin, userLogout, navigationKeys, getText, loading, setLoading, posts, setPosts }}>
            {children}
        </ContextStore.Provider>
    );

};

ContextStoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};