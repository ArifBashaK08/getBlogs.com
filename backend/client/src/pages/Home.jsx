import { useContext, useEffect } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { HashLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";
import NoData from "../components/NoData";
// import { posts } from "./sampleData"

const Home = () => {

  const [posts, setPosts] = useState([])
  const { search } = useLocation()
  const [loading, setLoading] = useState(false);
  const cat = search.split("=")[1]
  const {getText} = useContext(AuthContext)

  useEffect(() => {

    document.title = cat ? `getBlogs.com | ${cat.charAt(0).toUpperCase() + cat.slice(1)} Blogs` : `getBlogs.com | Home Page`

    const getPosts = async () => {
      try {
        setLoading(true)
        const apiURL = cat ? `/api/posts?cat=${cat}` : "/api/posts"
        const res = await axios.get(apiURL)
        setLoading(false)
        setPosts(res.data)
      } catch (err) {
        setLoading(false)
        console.error(err)
      }
    }
    getPosts()
  }, [cat])

  return (
    <div className="screen">
      {loading && <div className="loader">
        <HashLoader color={"#007f80"} />
      </div>}
      <section className={`home  ${loading ? "loading" : null}`}>
        <div className="posts">
          {posts.length > 0 ? posts.map(({ title, img, description, ID }) => (
            <div className="post" key={ID}>
              <div className="img">
                <img src={img} alt={title} />
              </div>
              <div className="content">
                <Link to={`/post/${ID}`}>
                  <h1>{title.length >= 100 ? title.slice(0, 100) + " ...." : title}</h1>
                </Link>
                <div>{getText(description.length >= 1000 ? description.slice(0, 1000) + " ...." : description)}</div>
                <Link to={`/post/${ID}`}>
                  <button>
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          )) : <NoData />}
        </div>
      </section>
    </div>
  )
}
export default Home