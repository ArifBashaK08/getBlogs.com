import { useContext, useEffect } from "react"
import { ContextStore } from "../context/ContextStore"
import { Link, useLocation } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"

const AllBlogs = () => {

    const { search } = useLocation()
    const cat = search.split("=")[1]
    const { loading, setLoading, posts, setPosts } = useContext(ContextStore)

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
        <section className={`pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center px-1 ${loading ? "loading" : null}`}>
            {posts.map(({ title, img, description, cat, _id }, index) => (
                <Card className="p-1 h-full" key={index}>
                    <CardContent className="flex items-center justify-center relative p-0 flex-col">
                        <Link to={`/?cat=${cat}`}
                            className="font-semibold border py-1 px-4 rounded-2xl backdrop-blur-lg bg-black/20 absolute top-4 left-4 z-50 border-none text-white hover:bg-white/20 hover:text-black text-xs"
                        >{cat[0].toUpperCase() + cat.slice(1)}</Link>
                        <div className="w-full h-[15rem] rounded-r-lg rounded-l-lg">
                            <img src={img} alt={title} className="h-full w-full object-cover rounded-r-lg rounded-l-lg" />
                        </div>
                        {/* TITLE & DESCRIPTION */}

                        <div className="flex items-center justify-between p-4">
                            <div className="flex flex-col gap-2 flex-1">
                                {/* TITLE */}
                                <Link to={`/post/${_id}`}>
                                    <h1 className="text-xl font-bold hover:underline">
                                        {title.length > 50 ? title.slice(0, 50) + "..." : title}
                                    </h1>
                                </Link>

                                {/* DESCRIPTION */}
                                <p className="text-xs md:text-sm lg:text-md">
                                    {description.length > 100 ? description.slice(0, 100) + "..." : description}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))

            }
        </section>
    )
}
export default AllBlogs