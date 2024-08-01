import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { AuthContext } from "../context/AuthContext";
import { FaRegImages } from "react-icons/fa6";
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import moment from 'moment';

const Write = () => {

  const postState = useLocation().state || {}; // Default to empty object if no state
  const navigate = useNavigate(); // Added navigate for redirection

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { navigationKeys } = useContext(AuthContext);

  const [description, setDescription] = useState(postState.description || "")
  const [postInputs, setPostInputs] = useState({
    title: postState.title || "",
    cat: postState.cat || "",
    image: null,
    formattedDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  });

  useEffect(() => {
    document.title = postState.title ? `Edit ${postState.title} | getBlogs.com` : `Create New Blog | getBlogs.com` ;
  }, [postState]);

  const inputChangeHandler = (e) => {
    // Check if the event has a target property before destructuring
    if (!e.target) return;

    const { name, value, files } = e.target;
    setPostInputs(prev => ({
      ...prev, [name]: files ? files[0] : value
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const { title, cat, image, formattedDate } = postInputs

      const response = postState.ID ? await axios.patch(`/api/posts/${postState.ID}`,
        { title, cat, image, formattedDate, description }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }) : await axios.post(`/api/posts/add`, { title, cat, image, formattedDate, description }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      setLoading(false);
      console.log("Response -",response.data);
      if (response.status === 201) {
        navigate("/");
      } else {
        setError("Unable to publish");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const saveDraft = () => {
    // Implementation for saving a draft
  };

  return (
    <div className={`screen`}>
      {loading && <div className="loader">
        <HashLoader color={"#007f80"} />
      </div>}
      <section className={`addBlog  ${loading ? "loading" : null}`}>
        <form className="write" onSubmit={submitHandler}>
          <div className="content">
            <input type="text" placeholder="Title" name='title' onChange={inputChangeHandler} value={postInputs.title} />
            <div className="editorContainer">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className='editor'
                name="description"
              />
            </div>
          </div>
          <div className="menu">
            <div className="item">
              <h3>Category</h3>
              <div className="category-group">
                {navigationKeys.map(({ catName }, index) => (
                  <div key={index} className="category">
                    <input
                      type="radio"
                      name="cat"
                      value={catName.toLowerCase()}
                      id={`cat-${index}`}
                      checked={postInputs.cat === catName.toLowerCase()}
                      onChange={inputChangeHandler}
                    />
                    <label htmlFor={`cat-${index}`}>{catName}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="item">
              <h3>Publish</h3>
              <lable htmlFor="file"><FaRegImages size={25} /> Upload image</lable>
              <input type="file" name="image"
                accept="image/jpeg, image/png, image/gif"
                onChange={inputChangeHandler} />
              <div className="status">
                <span>
                  <strong>Status: </strong>Draft
                </span>
                <span>
                  <b>Visibility: </b>Public
                </span>
              </div>
              <div className="buttons">
                <button type="button" onClick={saveDraft}>Save as draft</button>
                <button type='submit'>Publish</button>
              </div>
            </div>
          </div>
        </form>
      </section>
      {error && <div className="error">{error}</div>}
    </div>
  )
};

export default Write;
