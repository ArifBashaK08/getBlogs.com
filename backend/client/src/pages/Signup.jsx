import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { HashLoader } from "react-spinners";

const Signup = () => {

  const [signupInputs, setSignupInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: null
  });
  
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const inputChangeHandler = e => {
    e.preventDefault()
    const { name, value, files } = e.target;
    setSignupInputs(prev => ({
      ...prev, [name]: files ? files[0] : value
    }))
  }
  useEffect(() => {
    document.title = "getBlogs.com | Signup page" 
   }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    Object.keys(signupInputs).forEach(key => {
      formData.append(key, signupInputs[key])
    })

    try {
      await axios.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setLoading(false)
      navigate("/login");
    } catch (error) {
      setLoading(false)
      setError(error.response?.data?.message || "An error occurred")
    }
  }

  return (
    <div className="screen">
      {loading && <div className="loader">
        <HashLoader color={"#007f80"} />
      </div>}
      <section className={`auth ${loading ? "loading" : ""}`}>

        <h1 className="">Sign up</h1>

        <form onSubmit={submitHandler}>
          <input required type="text" placeholder="Full Name" name="name" onChange={inputChangeHandler} />

          <input required type="text" placeholder="username" name="username" onChange={inputChangeHandler} />

          <input required type="email" placeholder="email@example.com" name="email" onChange={inputChangeHandler} />

          <input required type="password" placeholder="Password" name="password" onChange={inputChangeHandler} />

          <div id="profilePic">
            <span>Wanna add profile pic?</span>
            <input type="file" name="image"
              accept="image/jpeg, image/png, image/gif"
              onChange={inputChangeHandler} />
          </div>

          <button type="submit">Register</button>

          <span className="">Already have account?
            <Link to="/login" className="">Sign In</Link>
          </span>
          {error && <p>{error}</p>}
        </form>
      </section>
    </div>
  )
}
export default Signup