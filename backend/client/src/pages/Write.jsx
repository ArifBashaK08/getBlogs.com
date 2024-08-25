import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom"; // Added useNavigate
import { ContextStore } from "../context/ContextStore";
import { FaRegImages } from "react-icons/fa6";
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import moment from 'moment';

const Write = () => {

  const postState = useLocation().state || {}; // Default to empty object if no state
  const navigate = useNavigate(); // Added navigate for redirection

  const [error, setError] = useState(null);
  const { navigationKeys, loading, setLoading } = useContext(ContextStore);

  const [description, setDescription] = useState(postState.description || "")
  const [postInputs, setPostInputs] = useState({
    title: postState.title || "",
    cat: postState.cat || "",
    image: null,
    formattedDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    // postStatus: "new"
  });

  useEffect(() => {
    document.title = postState.title ? `Edit ${postState.title} | getBlogs.com` : `Create New Blog | getBlogs.com`;
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
      // setPostInputs(...postInputs, postInputs.postStatus= "complete")
      const { title, cat, image, formattedDate } = postInputs

      const response = postState.ID ? await axios.put(`/api/posts/${postState.ID}`,
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
    // setPostInputs(...postInputs, postInputs.postStatus= "draft")
  };

  return (
    <>
      {loading && <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-blur-md bg-white/10">
        <HashLoader color={"#f43f5e"} />
      </div>}
      <section className={`flex w-full lg:w-4/5 h-screen items-center justify-center p-4 lg:p-8 flex-col`}>
        <form className="form-class" onSubmit={submitHandler}>
          <div className="flex-1 flex flex-col gap-4 justify-center items-center">
            <input type="text"
              name='title'
              placeholder="Title"
              onChange={inputChangeHandler}
              value={postInputs.title}
              className='px-3 py-2 bg-transparent border border-black/15 w-full rounded-md'
            />

            <div className="w-full">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className='h-40 lg:h-80 rounded-md'
                name="description"
              />
            </div>
          </div>
          <div className="menu-class">
            <div className="menu-item-class">
              <h3 className='menu-heading-class'>Category</h3>
              <hr className="hr-class" />
              <div className="category-group grid grid-cols-2 lg:grid-cols-3 gap-2">
                {navigationKeys.map(({ catName }, index) => (
                  <div key={index} className="flex items-center gap-2">
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
            <div className="menu-item-class">
              <h3 className='menu-heading-class'>Publish</h3>
              <hr className="hr-class" />
              <div className="grid grid-cols-2 py-1">
                <lable htmlFor="file"
                  className="flex items-center gap-2">
                  <FaRegImages size={25} /> Upload image
                </lable>
                <input type="file" name="image"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="grid grid-cols-2">
                <span>
                  <strong>Status: </strong>Draft
                </span>
                <span>
                  <b>Visibility: </b>Public
                </span>
              </div>
              <div className="flex justify-between py-2">
                <button type="button"
                  onClick={saveDraft}
                  className='btn-class outline outline-1 outline-rose-500 hover:bg-rose-500 hover:text-white'
                >Save as draft</button>
                <button type='submit'
                  className='btn-class bg-black text-white hover:bg-rose-500'
                >Publish</button>
              </div>
            </div>
          </div>
        </form>
        {error && <div className="error">{error} <Link to="/login" className="underline">Sign In</Link></div>}
      </section>
    </>

  )
};


export default Write;
