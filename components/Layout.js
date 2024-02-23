import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavSideBar from "@/components/NavSideBar";

export default function Layout(props) {
  return <div className="h-screen font-mono text-md text-ivory">
            <Header></Header>
            <div className="h-[75vh] flex w-full">
              <div className="h-full w-1/6">
                <NavSideBar></NavSideBar>
              </div>
              <div 
                className="w-2/3 ml-4 border rounded-lg p5 border-slate-50 bg-opacity-80 bg-gray-950">
                {props.children}
              </div>
            </div>
            <Footer></Footer>
         </div>
};