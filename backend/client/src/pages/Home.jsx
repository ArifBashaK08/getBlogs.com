import { useContext, useEffect } from "react"
import axios from "axios"
import { ContextStore } from "../context/ContextStore";
import { HomeCarousel, BlogsCarousel, BlogCatergory } from "../components";

const Home = () => {

  const { loading, setLoading, posts, setPosts } = useContext(ContextStore)

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/api/posts")
        setLoading(false)        
        setPosts(res.data)
      } catch (err) {
        setLoading(false)
        console.error(err)
      }
    }
    getPosts()
  }, [])

  return (
    <section className={`flex justify-center flex-col items-center gap-2 px-1 ${loading ? "loading" : null}`}>
      <HomeCarousel posts={posts} />
      <BlogCatergory />
      <BlogsCarousel posts={posts} title={"All Blogs"} />
    </section>
  )
}
export default Home