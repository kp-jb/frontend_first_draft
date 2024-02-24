import Link from "next/link";
import { HomeIcon, BookOpenIcon, PencilIcon, MagnifyingGlassIcon, BriefcaseIcon, ListBulletIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import {useRouter} from "next/router";
import React from "react";

import { useAuthContext } from "@/contexts/AuthContext";

export default function NavSideBar() {
  const [stateHover,setStateHover] = React.useState(""
  );
  const { userData, logoutFunction } = useAuthContext();
  const router = useRouter();
  const currPage = router.pathname;


  // console.log("NavSideBar",currPage);
  return (
    <div className="h-full flex flex-row flex-nowrap justify-center">
      <nav className="h-full w-2/3 flex flex-col items-start rounded-lg bg-gray-950 border border-ivory overflow-y-auto">
            <ul className="w-full pt-16 pb-16 flex flex-col flex-nowrap items-center justify-end space-y-14 text-sm">
              <li 
                className="w-full flex flex-row flex-nowrap justify-center"
                onMouseOver={()=>setStateHover("HOME")}
                onMouseLeave={()=>setStateHover("")}>
                <Link
                  href="/"
                  className={`${currPage==="/" 
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90" 
                  : ""}`}
                >
                {stateHover==="HOME"? "HOME":<HomeIcon className="w-5"/>}
                </Link>
              </li>

              { !userData?
                  <li className="flex flex-row flex-nowrap justify-center"
                  onMouseOver={()=>setStateHover("LOGIN")}
                  onMouseLeave={()=>setStateHover("")}>
                    <Link
                      href="/login"
                      className={`${currPage==="/login" 
                      ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                      : ""}`}
                    >
                    {stateHover==="LOGIN"? "LOGIN":<LockClosedIcon className="w-5"/>}
                    </Link>
                  </li>:
                  <></>
                }

              { userData?
              <li className="flex flex-row flex-nowrap justify-center"
                onMouseOver={()=>setStateHover("RECORDS")}
                onMouseLeave={()=>setStateHover("")}>
                <Link
                  href="/records"
                  className={`${currPage==="/records"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                {stateHover==="RECORDS"? "RECORDS":<BookOpenIcon className="w-5"/>}
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="flex flex-row flex-nowrap justify-center"
                onMouseOver={()=>setStateHover("EDITANDSAVE")}
                onMouseLeave={()=>setStateHover("")}>
                <Link
                  href="editandsave"
                  className={`${currPage==="/editandsave"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                {stateHover==="EDITANDSAVE"? "EDIT AND SAVE":<PencilIcon className="w-5"/>}
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="flex flex-row flex-nowrap justify-center"
                onMouseOver={()=>setStateHover("QUERY")}
                onMouseLeave={()=>setStateHover("")}>
                <Link
                  href="query"
                  className={`${currPage==="/query"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                {stateHover==="QUERY"? "QUERY":<MagnifyingGlassIcon className="w-5"/>}
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="flex flex-row flex-nowrap justify-center"
              onMouseOver={()=>setStateHover("DESCRIPTION")}
                onMouseLeave={()=>setStateHover("")}>
                <Link
                  href="description"
                  className={`${currPage==="/description"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                {stateHover==="DESCRIPTION"? "DESCRIPTION":<ListBulletIcon className="w-5"/>}
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="flex flex-row flex-nowrap justify-center"
              onMouseOver={()=>setStateHover("RESUME")}
                onMouseLeave={()=>setStateHover("")}>
                <Link
                  href="resume"
                  className={`${currPage==="/resume"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                {stateHover==="RESUME"? "RESUME":<BriefcaseIcon className="w-5"/>}
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="flex flex-row flex-nowrap justify-center"
              onMouseOver={()=>setStateHover("COVERLETTER")}
                onMouseLeave={()=>setStateHover("")}>
                <Link
                  href="coverletter"
                  className={`${currPage==="/coverletter"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                {stateHover==="COVERLETTER"? "COVER LETTER":<EnvelopeIcon className="w-5"/>}
                </Link>
              </li>
              :<></>}
              { userData?
              <li className="flex flex-row flex-nowrap justify-center"
              onMouseOver={()=>setStateHover("LOGOUT")}
                onMouseLeave={()=>setStateHover("")}>
                <Link
                  href="login"
                  onClick={logoutFunction}
                  className=""
                >
                {stateHover==="LOGOUT"? "LOG OUT":<LockClosedIcon className="w-5"/>}
                </Link>
              </li>
              :<></>}
            </ul>
      </nav>
    </div>
  );
}
