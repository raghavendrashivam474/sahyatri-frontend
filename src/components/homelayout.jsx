// components/layout.jsx
import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
// import Home from "./Home.jsx";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="flex gap-[2%] flex-wrap content-start">
      <div className="w-full h-[5%]">
        <Navbar />
      </div>
      <div className="grow h-3/4">
        <Outlet/>
      </div>
      <div className="w-full h-[5%]">
        <Footer />
      </div>
    </div>
  );
}

export default HomeLayout;
