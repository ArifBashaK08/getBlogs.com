import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import PropTypes from "prop-types"

const Signup = ({ setLoading }) => {

  const [signupInputs, setSignupInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: null
  });
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState(null)
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
      const response = await axios.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setLoading(false)
      response.status === 200 ? navigate("/login") : setError(response.data);
    } catch (error) {
      setLoading(false)
      setError(error.response?.data?.message || "An error occurred")
    }
  }

  return (
    <form onSubmit={submitHandler} className="w-5/6 md:w-1/2 lg:w-4/6 xl:w-[55%] flex items-center justify-center flex-col gap-4 p-4">
      <input required type="text"
        placeholder="Full Name"
        name="name"
        onChange={inputChangeHandler}
        className="input-class" />

      <input required type="text"
        placeholder="username"
        name="username"
        onChange={inputChangeHandler}
        className="input-class" />

      <input required type="email"
        placeholder="email@example.com"
        name="email"
        onChange={inputChangeHandler}
        className="input-class" />

      <div className="w-full relative">
        <input required
          name="password"
          placeholder="password"
          onChange={inputChangeHandler}
          type={showPassword ? "text" : "password"}
          className="input-class"
        />
        <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-0 bottom-0 flex items-center"
            >
              {showPassword ? <VscEye size={20} />
                : <VscEyeClosed size={20} />}
            </button>
      </div>

      <div id="profilePic" className="w-full flex flex-col gap-2 items-start text-white">
        <span className="text-sm flex-1">Wanna add profile pic?</span>
        <input type="file" name="image"
          accept="image/jpeg, image/png, image/gif"
          onChange={inputChangeHandler}
          className="text-sm flex-1" />
      </div>

      <button type="submit" className="btn-class bg-black w-full text-white">Register</button>

      <span className="text-white text-sm">Already have account?&nbsp;
        <Link to="/login" className="">Sign In</Link>
      </span>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  )
}

Signup.prototype={
  setLoading: PropTypes.string.isRequired
}

export default Signup