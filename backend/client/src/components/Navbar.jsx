import { Link, useLocation } from "react-router-dom"
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"


const Navbar = () => {

  const location = useLocation()
  const { search } = location
  const imgNotFound = "https://img.freepik.com/premium-vector/unknown-person-user-icon-white_116137-2948.jpg?w=740"

  const { currentUser, userLogout, navigationKeys } = useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="container">
        <Link to={"/"} className="logo">Get<span>Blogs</span>.com</Link>
        <div className="links">
          {navigationKeys.map(({ catName, catLink }, index) => (
            <Link className={`link ${search.split("=")[1] === catLink.split("=")[1] ? "isActive" : null}`} to={catLink} key={index}>
              <h5>{catName}</h5>
            </Link>
          ))
          }

          <span className="write">
            <Link to="/write">Add Blog</Link>
          </span>

          {currentUser ? <span className="link" onClick={userLogout}>
            <FiLogOut size={25} color="white" />
          </span> : <Link className="link" to="/login">
            <FiLogIn size={25} color="white" />
          </Link>}
          <span className={`${!currentUser ? "hideUser" : "user"}`}>
            <img
              src={(currentUser?.img) ? currentUser.img : imgNotFound}
              alt="User"
              style={{ display: currentUser ? "block" : "none" }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
export default Navbar