import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";
import { FaRegImages } from "react-icons/fa6";
import axios from 'axios';
import { HashLoader } from 'react-spinners';

const Write = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { navigationKeys } = useContext(AuthContext);
  const [addValue, setAddValue] = useState({
    title: "",
    description: "",
    image: null,
    cat: ""
  });

  useEffect(() => {
   document.title = "getBlogs.com | Add New Blog" 
  }, [])
  
  const inputChangeHandler = e => {
    console.log(e.target);
    const { name, value, files } = e.target;
    setAddValue(prev => ({
      ...prev, [name]: files ? files[0] : value
    }));
  };

  const handleQuillChange = (content) => {
    setAddValue(prev => ({
      ...prev, description: content
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(addValue).forEach(key => {
      formData.append(key, addValue[key]);
    });

    try {
      const response = await axios.post("/api/posts/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setLoading(false);
      response.status === 200 ? navigate("/") : setError("Unable to publish");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const saveDraft = () => {
    // Implementation for saving a draft
  };

  return (
    <div className="screen">
      {loading && <div className="loader">
        <HashLoader color={"#007f80"} />
      </div>}
      <section className="addBlog">
        <form className="write" onSubmit={submitHandler}>
          <div className="content">
            <input type="text" placeholder="Title" name='title' onChange={inputChangeHandler} />
            <div className="editorContainer">
              <ReactQuill
                theme="snow"
                value={addValue.description}
                onChange={handleQuillChange}
                className='editor'
                name="description"
              />
            </div>
          </div>
          <div className="menu">
            <div className="item">
              <h3>Category</h3>
              {navigationKeys.map(({ catName }, index) => (
                <div className="category" key={index}>
                  <input
                    required
                    type="radio"
                    name="cat"
                    value={catName.toLowerCase()}
                    id={catName.toLowerCase()}
                    onChange={inputChangeHandler}
                  />
                  <label htmlFor={catName.toLowerCase()}>{catName}</label>
                </div>
              ))}
            </div>
            <div className="item">
              <h3>Publish</h3>
              <input type="file" name="image" id="file" accept="image/jpeg, image/png, image/gif" style={{ display: "none" }} onChange={inputChangeHandler} />
              <label htmlFor="file" className='upload'><FaRegImages size={25} /> Upload image</label>
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
    </div>
  )
}
export default Write;
