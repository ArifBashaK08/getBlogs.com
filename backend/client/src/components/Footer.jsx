import { Link } from "react-router-dom"
import { FaGithub, FaYoutube, FaTwitter, FaFacebookSquare } from "react-icons/fa";


const Footer = () => {

  const companyList = ["Blog", "Careers", "Pricing"]
  const ResourcesList = ["Support", "About", "Documentation"]
  const LegalList = ["Terms & Conditions", "Privacy Policy", "Data processing"]


  return (
    <footer className="footer-class">
      <div className="flex justify-between items-start flex-col md:flex-row gap-4">
        <div className="footer-right-class">
        <Link to={"/"} className="w-60 h-14">
        <img src="/logo.png" alt="logo" className="w-full h-full object-cover"/>
        </Link>
          <p className="text-sm font-semibold">Follow us on </p>
          <div className="icons-class">
            <a href="https://github.com/ArifBashaK08/getBlogs.com" target="_blank"
              className="icon">
              <FaGithub size={25} />
            </a>
            <a href="https://www.youtube.com/" target="_blank"
              className="icon">
              <FaYoutube size={25} fill="red" />
            </a>
            <a href="https://www.twitter.com/" target="_blank"
              className="icon">
              <FaTwitter size={25} fill="#4B70F5" />
            </a>
            <a href="https://www.facebook.com/" target="_blank"
              className="icon">
              <FaFacebookSquare size={25} fill="#4B70F5" />
            </a>
          </div>
        </div>
        <div className="footer-left-class">
          <ul className="footer-options-class">
            <h3 className="ul-title-class px-2">Company</h3>
            <hr className="hr-class lg:w-3/4" />
            {companyList.map((item, index) => (
              <li className="ul-li-class" key={index}>{item}</li>
            ))}
          </ul>
          <ul className="footer-options-class">
            <h3 className="ul-title-class px-2">Resources</h3>
            <hr className="hr-class lg:w-3/4" />
            {ResourcesList.map((item, index) => (
              <li className="ul-li-class" key={index}>{item}</li>
            ))}
          </ul>
          <ul className="footer-options-class">
            <h3 className="ul-title-class px-2">Legal</h3>
            <hr className="hr-class lg:w-3/4" />
            {LegalList.map((item, index) => (
              <li className="ul-li-class" key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="border-slate-700" />
      <div className="flex justify-between items-center w-full flex-col md:flex-row gap-1 lg:gap-2">
        <p className="font-semibold text-xs lg:text-sm">
          Made with ❤️ using <span className="uppercase text-rose-500 text-base">React JS</span>
        </p>
        <p className="font-semibold text-xs lg:text-sm">
          Developed by <span className="uppercase text-rose-500 text-base">Arif Basha K.</span>
        </p>
      </div>
    </footer>
  )
}
export default Footer 
