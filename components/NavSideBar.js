import Link from "next/link";
import {useRouter} from "next/router";

import { useAuthContext } from "@/contexts/AuthContext";

export default function NavSideBar() {
  const { userData } = useAuthContext();
  const router = useRouter();
  const currPage = router.pathname;


  // console.log("NavSideBar",currPage);
  return (
    <div className="text-gray-50">
      <nav className="flex flex-col items-start rounded-lg bg-gray-950 w-36 h-72">
          <div className="p-4 m-1">
            <ul className="">
              <li className="my-6">
                <Link
                  href="/"
                  className={`${currPage==="/" 
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90" 
                  : ""}`}
                >
                Home
                </Link>
              </li>

              { userData?
                <></>:
              <li className="my-6">
                <Link
                  href="/login"
                  className={`${currPage==="/login" 
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                Login
                </Link>
              </li>}

              { userData?
              <li className="my-6">
                <Link
                  href="/records"
                  className={`${currPage==="/records"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                Records
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="my-6">
                <Link
                  href="editandsave"
                  className={`${currPage==="/editandsave"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                Edit and Save
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="my-6">
                <Link
                  href="query"
                  className={`${currPage==="/query"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                Query
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="my-6">
                <Link
                  href="description"
                  className={`${currPage==="/description"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                Description
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="my-6">
                <Link
                  href="resume"
                  className={`${currPage==="/resume"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                Resume
                </Link>
              </li>
              :<></>}

              { userData?
              <li className="my-6">
                <Link
                  href="coverletter"
                  className={`${currPage==="/coverletter"
                  ? "text-gray-950 rounded-md p-1 ring-2 ring-slate-100 bg-ivory opacity-90"
                  : ""}`}
                >
                Cover Letter
                </Link>
              </li>
              :<></>}
            </ul>
          </div>

      </nav>
    </div>
  );
}
