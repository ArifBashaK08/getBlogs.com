import { Login, Signup, Write, Single, Home, AllBlogs, AuthPage } from "./pages"
import { Navbar, Footer } from "./components"

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import './App.css'
import { useContext } from "react"
import { ContextStore } from "./context/ContextStore"
import { HashLoader } from "react-spinners";


const Layout = () => {

  const { loading } = useContext(ContextStore)

  return (
    <>
      <Navbar />
      <div className="w-screen min-h-screen flex items-center justify-center">
        {loading && <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-blur-md bg-white/10">
          <HashLoader color={"#f43f5e"} />
        </div>}
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ]
  },
  {
    path: "/signup",
    element: <AuthPage pageType={"signUp"} />,
  },
  {
    path: "/login",
    element: <AuthPage pageType={"signIn"} />,
  },
])

function App() {
  return (
    <div className='app w-full bg-gradient-to-r from-red-100 to-blue-200'>
      <div className="overflow-x-hidden h-screen">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
