import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavSideBar from "@/components/NavSideBar";

export default function Layout(props) {
  return <div className="h-full font-mono text-xs text-gray-800 bg-cover bg-corona-fore-typewriter">
            <Header></Header>
            <div className="flex w-full border-red-500">
              <div className="w-1/6 border border-purple-500">
                <NavSideBar></NavSideBar>
              </div>

              <div className="w-3/6 p-5 ml-4 border border-blue-500 rounded-lg bg-opacity-35 bg-slate-100">
                {props.children}

              </div>
            </div>
            <Footer></Footer>
         </div>
};