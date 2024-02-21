import Link from "next/link";
import {useRouter} from "next/router";

import { useAuthContext } from "@/contexts/AuthContext";

export default function NavSideBar() {
  const { userData } = useAuthContext();
  const router = useRouter();
  const currPage = router.pathname;


  // console.log("NavSideBar",currPage);
  return (
    <div className=" text-purple-500 border">
      <nav className="">
          <div className="">
            <ul className="">
              <li>
                <Link
                  href="/"
                  className={`${currPage==="/"?"text-red-900":""}`}
                >
                Home
                </Link>
              </li>

              { userData?
                <></>:
              <li>
                <Link
                  href="/login"
                  className={`${currPage==="/login"?"text-red-900":""}`}
                >
                Login
                </Link>
              </li>}

              { userData?
              <li>
                <Link
                  href="/records"
                  className={`${currPage==="/records"?"text-red-900":""}`}
                >
                Records
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="editandsave"
                  className={`${currPage==="/editandsave"?"text-red-900":""}`}
                >
                Edit and Save
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="query"
                  className={`${currPage==="/query"?"text-red-900":""}`}
                >
                Query
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="description"
                  className={`${currPage==="/description"?"text-red-900":""}`}
                >
                Description
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="resume"
                  className={`${currPage==="/resume"?"text-red-900":""}`}
                >
                Resume
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="coverletter"
                  className={`${currPage==="/coverletter"?"text-red-900":""}`}
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
