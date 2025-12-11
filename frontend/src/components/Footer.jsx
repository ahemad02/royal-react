import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-900 pt-10 pb-6 sm:pt-12 sm:pb-8 md:pt-16 md:pb-12  lg:pt-20 lg:pb-10">
      <div className="app-container mx-auto px-6">

        {/* Logo */}
        <div className="flex justify-center mb-14">
          <img src="/images/footer-logo.svg" alt="Royal Floor" className="w-48" />
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left sm:text-center lg:text-left">


          {/* Stay Up To Date */}
          <div>
            <h4 className="text-[15px] uppercase tracking-wider mb-5 sm:mb-8 text-left">
              Stay Up To Date
            </h4>

            {/* Social Icons */}
            <div className="flex gap-3 justify-start lg:justify-start mb-6">
              <button className="border p-2 rounded-md hover:bg-gray-100">
                <FaInstagram size={18} />
              </button>
              <button className="border p-2 rounded-md hover:bg-gray-100">
                <FaLinkedinIn size={18} />
              </button>
              <button className="border p-2 rounded-md hover:bg-gray-100">
                <FaFacebookF size={18} />
              </button>
            </div>

            <button className="flex border pt-4 pr-10 pb-3 pl-10 rounded-md font-light hover:bg-gray-100">
              SUBSCRIBE / FOLLOW US
            </button>
          </div>

          {/* Quick Links */}
        <div className="relative lg:pr-10 lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-0 lg:after:h-full lg:after:border-r lg:after:border-dashed lg:after:border-gray-400 text-left">


            <h4 className="text-[15px] uppercase tracking-wider mb-5 sm:mb-8">
              Quick Links
            </h4>
           <ul className="space-y-1">
  <li className="mb-2">
    <NavLink to="/" className={({ isActive }) => isActive ? "footer-link active" : "footer-link"}>
      Home
    </NavLink>
  </li>
  <li className="mb-2">
    <NavLink to="/about" className={({ isActive }) => isActive ? "footer-link active" : "footer-link"}>
      About
    </NavLink>
  </li>
  <li className="mb-2">
    <NavLink to="/product" className={({ isActive }) => isActive ? "footer-link active" : "footer-link"}>
      Product
    </NavLink>
  </li>
  <li className="mb-2">
    <NavLink to="/catalogue" className={({ isActive }) => isActive ? "footer-link active" : "footer-link"}>
      Catalogue
    </NavLink>
  </li>
  <li className="mb-2">
    <NavLink to="/inquiry" className={({ isActive }) => isActive ? "footer-link active" : "footer-link"}>
      Inquiry
    </NavLink>
  </li>
  <li className="mb-2">
    <NavLink to="/career" className={({ isActive }) => isActive ? "footer-link active" : "footer-link"}>
      Career
    </NavLink>
  </li>
  <li className="mb-2">
    <NavLink to="/blog" className={({ isActive }) => isActive ? "footer-link active" : "footer-link"}>
      Blog
    </NavLink>
  </li>
  <li>
    <NavLink to="/contact" className={({ isActive }) => isActive ? "footer-link active" : "footer-link"}>
      Contact Us
    </NavLink>
  </li>
</ul>

          </div>

          {/* Contact Us */}
      <div className="relative sm:mb-10 lg:mb-0 lg:pr-10 lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-0 lg:after:h-full lg:after:border-r lg:after:border-dashed lg:after:border-gray-400">


            <h4 className="text-[15px] uppercase tracking-wider mb-5 sm:mb-8 text-left">
              Contact Us
            </h4>

            <div className="flex gap-3 justify-start items-start lg:justify-start mb-5">
              <img className="h-full" src="/images/telephone.svg"  />
              <div className="text-md leading-5">
                <p className="mb-1.5"> +01 94528 33306 </p> 
                <p>+91 99251 63141 </p>
              </div>
            </div>

            <div className="flex gap-3 justify-start items-start lg:justify-start mb-3">
              <img className="h-full" src="/images/email.svg"  />
              <div className="text-md leading-5">
                 <p className="mb-1.5"> paresh@royalfloorusa.com</p> 
                <p>info@royalfloorusa.com</p>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div>
            <h4 className="text-[15px] uppercase tracking-wider mb-5 sm:mb-8 text-left">  
              Address
            </h4>

            <div className="flex gap-3 justify-start items-start lg:justify-start mb-4">
              <img className="h-full" src="/images/location.svg"  />
              <p className="text-md leading-5 text-left">
                1547 B Finnegan Ln<br />North Brunswick, NJ 08902, USA
              </p>
            </div>

            <div className="flex gap-3 justify-start align-start lg:justify-start mb-4">
              <img className="h-full" src="/images/location.svg"  />
              <p className="text-md leading-5 text-left">
                2305 E Belt Line Rd, Suite 100,<br />Carrollton, TX 75006, USA
              </p>
            </div>

            <div className="flex gap-3 justify-start align-start lg:justify-start">
              <img className="h-full" src="/images/location.svg"  />
              <p className="text-md leading-5 text-left">
                Khodiyar Estate, Nr. Gota Bridge,<br />Gota, Ahmedabad, 382481.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8" />

        {/* Bottom Text Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-md">
          <p>©2025 Royalfloor All rights reserved.</p>
          <img src="/images/levox.svg" className="w-24 mt-4 lg:mt-0" />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
