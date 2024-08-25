// import { posts } from "../pages/sampleData"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"


const Menu = ({ cat, postID }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getRecommandations = async () => {
            try {
                const apiURL = `/api/posts?cat=${cat}`
                const res = await axios.get(apiURL)
                const data = res.data
                setPosts((data.filter(item => item._id !== postID)).slice(0, 3))
            } catch (err) {
                console.error(err)
            }
        }
        getRecommandations()
    }, [cat])
    
    return (
        <div className="flex flex-col flex-1 min-w-[25%] sm:min-h-[15rem] lg:min-h-[18rem] backdrop-blur-lg bg-black/15 p-2 rounded-md gap-1">
            <h1 className="text-lg  lg:text-2xl font-bold uppercase">Other posts you may like</h1>
            <hr className="w-full" />
            {posts.length > 0 ? posts.map(({ _id, title, img, }) => (
                <div className="rounded-md flex flex-col gap-2" key={_id}>
                    <div className="w-full h-[20rem]">
                    <img src={img} alt={title} className="rounded-md h-full w-full object-cover" />
                    </div>
                    <Link to={`/post/${_id}`} className="text-lg lg:text-xl font-bold hover:text-white hover:underline">{title}</Link>
                </div>
            )) :
                <strong className="text-lg lg:text-xl font-bold h-full w-full flex items-center justify-center">Related posts not available!</strong>
            }
        </div>
    )
}

Menu.propTypes = {
    cat: PropTypes.node.isRequired
}

export default Menu
