// import { posts } from "../pages/sampleData"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"


const Menu = ({ cat }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getRecommandations = async () => {
            try {
                const apiURL = `/api/posts?cat=${cat}`
                const res = await axios.get(apiURL)

                setPosts(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getRecommandations()
    }, [cat])

    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.length > 0 ? posts.map(post => (
                <div className="post" key={post.ID}>
                    <img src={post.img} alt={post.title} />
                    <h2>{post.title}</h2>
                    <button><Link to={`/post/${post.ID}`}>Read more</Link></button>
                </div>
            )) :
                <strong className="">Related posts not available!</strong>
            }
        </div>
    )
}

Menu.propTypes = {
    cat: PropTypes.node.isRequired
}

export default Menu
