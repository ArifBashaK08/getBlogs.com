import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FaTrashAlt } from "react-icons/fa"
import PropTypes from "prop-types"

const DeletePost = ({ postId, setLoading }) => {

  const navigate = useNavigate()
  const deletePost = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/posts/${postId}`)
      setLoading(false)
      res.status === 200 ? navigate("/") : console.log(res.data);
    } catch (err) {
      console.error("Failed to delete post:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <FaTrashAlt fill="red" onClick={deletePost} size={20} style={{ cursor: "pointer" }} />
    </>
  )
}

DeletePost.propTypes = {
  postId: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default DeletePost
