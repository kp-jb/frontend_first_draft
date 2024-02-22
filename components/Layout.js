import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavSideBar from "@/components/NavSideBar";

export default function Layout(props) {
  return <div className="h-full font-mono text-xs text-gray-800">
            <Header></Header>
            <div className="flex w-full">
              <div className="w-1/6">
                <NavSideBar></NavSideBar>
              </div>
              <div 
                // className="w-3/6 p-5 ml-4 border rounded-lg border-white-500 bg-opacity-35 bg-slate-100">
                // className="w-3/6 ml-4 border rounded-lg bg-opacity-30 p5 border-white-500 bg-gray-950">
                className="w-3/6 ml-4 border rounded-lg p5 border-slate-50 bg-opacity-80 bg-gray-950">
                {props.children}
              </div>
            </div>
            <Footer></Footer>
         </div>
};