import { useEffect } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { HashLoader } from "react-spinners";
// import { posts } from "./sampleData"

const Home = () => {

  const [posts, setPosts] = useState([])
  const { search } = useLocation()
  const [loading, setLoading] = useState(false);
  const cat = search.split("=")[1]

  useEffect(() => {

    document.title = cat ? `getBlogs.com | ${cat.charAt(0).toUpperCase()+cat.slice(1)} Blogs` : `getBlogs.com | Home Page`

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
      <section className="home">
        <div className="posts">
          {posts.map(post => (
            <div className="post" key={post.ID}>
              <div className="img">
                <img src={post.img} alt={post.title} />
              </div>
              <div className="content">
                <Link to={`/post/${post.ID}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.description}</p>
                <Link to={`/post/${post.ID}`}>
                  <button>
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
export default Home