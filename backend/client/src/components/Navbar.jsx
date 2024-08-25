import { Link, useLocation } from "react-router-dom"
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { useContext } from "react";
import { ContextStore } from "../context/ContextStore"
import SmallDeviceMenu from "./SmallDeviceMenu";


const Navbar = () => {

  const location = useLocation()
  const { search } = location
  const imgNotFound = "https://img.freepik.com/premium-vector/unknown-person-user-icon-white_116137-2948.jpg?w=740"

  const { currentUser, userLogout, navigationKeys } = useContext(ContextStore)
  return (
    <div className="navbar-class">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="w-80 h-16">
        <img src="/logo.png" alt="logo" className="w-full h-full object-cover"/>
        </Link>

        {/* CATEGORY LINKS */}
        <div className="block xl:hidden">
          <SmallDeviceMenu navigationKeys={navigationKeys} currentUser={currentUser} userLogout={userLogout} search={search} />
        </div>
        <div className="hidden xl:flex items-center gap-4">
          {navigationKeys.map(({ catName, catLink }, index) => (
            <Link className={`py-1 px-2 rounded-md  ${search.split("=")[1] === catLink.split("=")[1] ? "bg-black" : null}`} to={catLink} key={index}>
              <h5 className={`font-semibold text-white hover:text-rose-500`}>{catName}</h5>
            </Link>
          ))
          }
          <div className="flex items-center gap-8">
            <span className="font-semibold py-1 px-2 rounded-md text-white hover:bg-white hover:text-black">
              <Link to="/write">Add Blog</Link>
            </span>

            {currentUser ? <span className="text-white p-1 rounded-full hover:bg-white hover:text-black" onClick={userLogout}>
              <FiLogOut size={25}/>
            </span> : <Link className="" to="/login">
              <FiLogIn size={25}/>
            </Link>}
            <span className={`${!currentUser ? "hidden" : "flex justify-between items-center w-14 h-14 rounded-full border-x-cyan-600 border-4"}`}>
              <img
                src={(currentUser?.img) ? currentUser.img : imgNotFound}
                alt="User"
                style={{ display: currentUser ? "block" : "none" }}
                className="object-cover w-full h-full overflow-hidden rounded-full"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Navbar