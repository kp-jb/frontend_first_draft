import Link from "next/link";

import { useAuthContext } from "@/contexts/AuthContext";

export default function NavSideBar() {
  const { userData } = useAuthContext();

  console.log("NavSideBar",userData);
  return (
    <div className="text-purple-500">
      <nav className="">
          <div className="">
            <ul className="">
              <li>
                <Link
                  href="/"
                  className=""
                >
                Home
                </Link>
              </li>

              { userData?
                <></>:
              <li>
                <Link
                  href="/login"
                  className=""
                >
                Login
                </Link>
              </li>}

              { userData?
                <></>:
                <li>
                  <Link
                    href="/registration"
                    className=""
                  >
                  Registration
                  </Link>
                </li>}

              { userData?
              <li>
                <Link
                  href="/records"
                  className=""
                >
                Records
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="editandsave"
                  className=""
                >
                Edit and Save
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="query"
                  className=""
                >
                Query
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="description"
                  className=""
                >
                Description
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="resume"
                  className=""
                >
                Resume
                </Link>
              </li>
              :<></>}

              { userData?
              <li>
                <Link
                  href="coverletter"
                  className=""
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
