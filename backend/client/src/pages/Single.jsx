import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import moment from "moment"
import Menu from "../components/Menu";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import DeletePost from "../components/DeletePost";
import { HashLoader } from "react-spinners";
// import Comments from "../components/Comments";

const Single = () => {

  const [post, setPost] = useState([])
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false);
  const postId = pathname.split("/")[2]
  const { currentUser, getText } = useContext(AuthContext)

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
      }finally {
        setLoading(false);
      }
    }
    getPost()
  }, [postId])

  useEffect(()=> {
    document.title = `${post?.title} | getBlogs.com`
  },[post.title])

  console.log(post.cat)

  return (
    <div className="screen">
      {loading && <div className="loader">
        <HashLoader color={"#007f80"} />
      </div>}
      <section className={`singlePage  ${loading ? "loading" : null}`}>
        <div className="single">
          <div className="content">
            <img src={post.img} alt="Post Image" />
            <div className="user">
              <div className="details">
                <img src={post.userImg} alt="User" />
                <div className="info">
                  <span>{post.name}</span>
                  <p>Created : <span>{moment(post.created_at).fromNow()}</span></p>
                  <p>Last updated : <span>{moment(post.updated_at).fromNow()}</span></p>
                </div>
              </div>
              {currentUser.ID === post.uid ? (
                <div className="edit">
                  <Link to={`/write?edit=${postId}`} state={post}>
                    <FaEdit fill="teal" size={20} />
                  </Link>
                    <DeletePost postId={postId} setLoading={setLoading} />
                </div>
              ) : null}
            </div>
            <h1>{post.title}</h1>
            <div className="description">{getText(post.description)}</div>
            {/* <Comments /> */}
          </div>
          <Menu cat={post.cat} />
        </div>
      </section>
    </div>
  )
}
export default Single