import * as React from "react"
import { IoMenu } from "react-icons/io5";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"


const SmallDeviceMenu = ({ navigationKeys, currentUser, userLogout, search }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent px-2 py-1">
                        <IoMenu size={25} color="#f43f5e" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-2 flex flex-col gap-1">
                        <h3 className="font-bold text-base">Categories</h3>
                        <hr className="hr-class" />
                        <ul className="grid w-[200px] gap-3 md:w-[250px] md:grid-cols-2 text-sm">
                            {navigationKeys.map(({ catName, catLink }, index) => (
                                <li key={index} className={`py-1 px-2 rounded-md hover:bg-black hover:text-white ${search.split("=")[1] === catLink.split("=")[1] ? "bg-rose-500 text-white font-semibold" : null}`}>
                                    <Link to={catLink}>
                                        {catName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <button className="font-semibold flex justify-center">
                            <Link to="/write" className="py-1 px-2 rounded-md hover:text-white bg-white text-black hover:bg-rose-500 w-full">Add Blog</Link>
                        </button>
                        {currentUser ? <div className="w-full grid grid-cols-2 px-2 gap-3 font-semibold text-sm lg:text-base">
                            <Link className="flex items-center" to="/">
                                My Profile
                            </Link>
                            <span className="py-1 px-2 rounded-md hover:underline hover:text-white" onClick={userLogout}>
                                LogOut
                            </span>
                        </div>
                            : <>
                                <Link className="" to="/signup">
                                    Sign Up
                                </Link>
                                <Link className="" to="/login">
                                    LogIn
                                </Link>
                            </>
                        }
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}


export default SmallDeviceMenu