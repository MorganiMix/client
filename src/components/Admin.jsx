import React from "react";
import { Services, Footer } from "./";
import logo from "../../images/logo.png";

const Admin = ({ onLogout }) => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
          <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
            <div className="flex flex-[0.5] justify-center items-center">
              <a href="https://nanifish.com" className="mx-2 cursor-pointer">
                <img src={logo} alt="logo" className="w-32" />
              </a>
            </div>
            <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
              <span className="text-white text-xl font-bold">Admin Page</span>
              <button 
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <Footer />
    </div>
  );
};

export default Admin;