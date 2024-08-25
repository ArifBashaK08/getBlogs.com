import { Signup, Login } from "./index"
import { ContextStore } from "../context/ContextStore";
import { useContext } from "react";
import { HashLoader } from "react-spinners";


const AuthPage = ({ pageType }) => {
    const { userLogin, setLoading, loading } = useContext(ContextStore)

    return (
        <>
            {loading && <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-blur-md bg-white/10">
                <HashLoader color={"#f43f5e"} />
            </div>}
                <section className={`h-full w-full flex justify-center items-center`}>
                    <div className="hidden lg:block flex-1 h-full">
                        <img src="/signIn.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-[#031021] ">
                        <div className="w-2/3 h-16 mb-8">
                            <img src="/logo.png" alt="logo" className="md:w-full md:h-full object-cover" />
                        </div>
                        <div className="flex gap-4 w-5/6 lg:w-1/2 items-center">
                            <hr className="hr-class bg-slate-700" />
                            <h1 className="font-bold text-center flex-1 text-lg lg:text-2xl text-white">{pageType === "signIn" ? "Sign In" : "Sign Up "}</h1>
                            <hr className="hr-class bg-slate-700" />
                        </div>
                        {pageType === "signIn" ? <Login userLogin={userLogin} setLoading={setLoading} loading={loading} /> : <Signup setLoading={setLoading} loading={loading} />}
                    </div>
                </section>
        </>
    )
}
export default AuthPage