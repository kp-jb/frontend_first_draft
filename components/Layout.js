import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavSideBar from "@/components/NavSideBar";

export default function Layout(props) {
  return <div className="text-gray-800">
            <Header></Header>
            <NavSideBar></NavSideBar>
              {props.children}
            <Footer></Footer>
         </div>;
};