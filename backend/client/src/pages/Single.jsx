import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import moment from "moment"
import Menu from "../components/Menu";
import { ContextStore } from "../context/ContextStore";
import axios from "axios";
import DeletePost from "../components/DeletePost";
import { HashLoader } from "react-spinners";
// import Comments from "../components/Comments";

const Single = () => {

  const [post, setPost] = useState([])
  const { pathname } = useLocation()

  const postId = pathname.split("/")[2]
  const { currentUser, getText, loading, setLoading } = useContext(ContextStore)

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true)
        const apiURL = `/api/posts/${postId}`
        const res = await axios.get(apiURL)
        setLoading(false)
        setPost(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    }
    getPost()
  }, [postId])

  useEffect(() => {
    document.title = `${post?.title} | getBlogs.com`
  }, [post.title])

  return (
    <>
    {loading && <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-blur-md bg-white/10">
        <HashLoader color={"#f43f5e"} />
      </div>}
    <section className={`mt-16 px-20 flex justify-center items-center w-full p-2`}>
      <div className="flex justify-between gap-4 flex-col md:flex-row">
        <div className="flex flex-col flex-1 md:flex-[1.8] lg:flex-2 gap-2 lg:gap-4">
          <div className="lg:max-h-[30rem]">
            <img src={post.img} alt="Post Image" className="w-full h-full object-cover rounded-md" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex justify-between items-center w-10 h-10 lg:w-14 lg:h-14 rounded-full">
                <img src={post.userImg} alt="User" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="">
                <span className="font-semibold text-sm lg:text-md">{post.name}</span>
                <div className="flex gap-1 lg:gap-2 items-center">
                  <p className="text-xs font-semibold text-gray-600">Created : <span>{moment(post.created_at).fromNow()}</span></p>|
                  <p className="text-xs font-semibold text-gray-600">Last updated : <span>{moment(post.updated_at).fromNow()}</span></p>
                </div>
              </div>
            </div>
            {currentUser && currentUser?._id === post.uid ? (
              <div className="flex items-center gap-2">
                <Link to={`/write?edit=${postId}`} state={post}>
                  <FaEdit fill="teal" size={20} />
                </Link>
                <DeletePost postId={postId} setLoading={setLoading} />
              </div>
            ) : null}
          </div>
          <h1 className="text-lg md:text-2xl xl:text-4xl text-md font-semibold lg:font-bold text-wrap">{post.title}</h1>
          <div className="text-pretty text-justify">{getText(post.description)}</div>
          {/* <Comments /> */}
        </div>
        <Menu cat={post.cat?.toLowerCase()} postID={post.ID} />
      </div>
    </section>
    </>
  )
}
export default Single