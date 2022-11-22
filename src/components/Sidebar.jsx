import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { RiCloseLine } from "react-icons/ri"
import { HiOutlineMenu } from "react-icons/hi"
import { FaMusic } from "react-icons/fa"

import { links } from "../assets/constants"

const NavLinks = ({ handleClick }) => (
  <div>
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-[#dedede]"
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
      <div className="hidden md:flex flex-col w-[240px] py-10 px-4 bg-black">
        <Link to="/" className="flex items-center justify-center gap-3">
          <h1 className="h-14 text-white font-bold text-4xl  tracking-wider">
            MUSIK
          </h1>
          <FaMusic className="w-8 h-8 text-[#f81617] self-start" />
        </Link>
        <NavLinks />
      </div>

      {/* Mobile Navbar */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-6 h-6 text-white mr-2 cursor-pointer"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-6 h-6 text-white mr-2 cursor-pointer"
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10  backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <Link to="/" className="flex items-center justify-center gap-3">
          <h1 className="h-14 text-white font-bold text-4xl tracking-wider">
            MUSIK
          </h1>
          <FaMusic className="w-8 h-8 text-[#f81617] self-start" />
        </Link>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}

export default Sidebar
