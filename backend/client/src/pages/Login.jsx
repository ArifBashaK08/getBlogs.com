import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const { userLogin } = useContext(AuthContext)
  const navigate = useNavigate()
  const [signinInputs, setSigninInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      response.status === 200 ? navigate("/") : setError("Invalid Credntials");

    } catch (err) {
      setLoading(false);
      setError("An error occurred during login.");
    }

  };

  return (
    <div className="screen">
      {loading && <div className="loader">
        <HashLoader color={"#007f80"} />
      </div>}
      <section className={`auth ${loading ? "loading" : ""}`}>
        <h1 className="">LogIn</h1>
        <form onSubmit={submitHandler}>
          <input required type="email" placeholder="email@example.com" name="email" onChange={inputChangeHandler} />

          <input required type="password" placeholder="Password" name="password" onChange={inputChangeHandler} />

          <button type="submit">Log In</button>

          {error && <p>{error}</p>}

          <span className="">Don't have account? <Link to="/signup" className="">Register</Link></span>
        </form>
      </section>
    </div>
  )
}
export default Login;