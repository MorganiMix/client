import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";
/*
const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["NaniDrive", "Media Server", "YouTube DL Server", "Chatroom"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Contact Us
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["NaniDrive", "Media Server", "YouTube DL Server", "Chatroom"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};
*/

const Navbar = ({ onAdminClick }) => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <a href="https://nanifish.com" className="mx-2 cursor-pointer">
          <img src={logo} alt="logo" className="w-32" />
        </a>
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <a href="https://drive.nanifish.com" target="_blank" rel="noopener noreferrer" className="text-white text-base text-center mx-2 cursor-pointer">
          Nanidrive
        </a>
        <a href="https://download.nanifish.com" target="_blank" rel="noopener noreferrer" className="text-white text-base text-center mx-2 cursor-pointer">
          YouTube DL Server
        </a>
        <a href="https://filebrowser.nanifish.com" target="_blank" rel="noopener noreferrer" className="text-white text-base text-center mx-2 cursor-pointer">
          File Downloader
        </a>
        <a href="https://warden.nanifish.com" target="_blank" rel="noopener noreferrer" className="text-white text-base text-center mx-2 cursor-pointer">
          Password Manager
        </a>
        <a onClick={onAdminClick} className="text-white text-base text-center mx-2 cursor-pointer">
          Admin
        </a>
      </div>
    </div>
  </div>
  );

export default Navbar;
