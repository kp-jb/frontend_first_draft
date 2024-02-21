import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavSideBar from "@/components/NavSideBar";

export default function Layout(props) {
  return <div className="text-gray-800">
            <Header></Header>
            <div className="flex w-full border-red-500">
              <div className="w-1/6 border border-purple-500">
                <NavSideBar></NavSideBar>
              </div>
              <div className="w-5/6 border border-blue-500">
              {props.children}
              </div>
            </div>
            <Footer></Footer>
         </div>
};