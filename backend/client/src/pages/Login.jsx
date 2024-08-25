import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Login = ({ userLogin, setLoading }) => {

  const navigate = useNavigate()
  const [signinInputs, setSigninInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false)

  const inputChangeHandler = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setSigninInputs(prev => ({
      ...prev, [name]: value
    }));
  };

  useEffect(() => {
    document.title = "getBlogs.com | Login page"
  }, [])
  const submitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    Object.keys(signinInputs).forEach(key => {
      formData.append(key, signinInputs[key]);
    });

    try {
      const response = await userLogin(signinInputs);
      setLoading(false);
      response?.status === 200 ? navigate("/") : setError("Invalid Credentials!");
    } catch (err) {
      setLoading(false);
      setError("Invalid Credentials!");
    }

  };

  return (
    <form onSubmit={submitHandler} className="w-5/6 md:w-1/2 lg:w-4/6 xl:w-[55%] flex items-center justify-center flex-col gap-4 p-4">
      <input required
        type="email"
        placeholder="email@example.com"
        name="email" onChange={inputChangeHandler}
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

      <button type="submit"
        className="btn-class bg-black w-full text-white"
      >Log In</button>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <span className="text-xs lg:text-sm text-white">Don&apos;t have account? <Link to="/signup" className="hover:underline">Register</Link></span>
    </form>
  )
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  setLoading: PropTypes.string.isRequired
};

export default Login;