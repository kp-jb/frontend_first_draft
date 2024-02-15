import { useAuthContext } from "@/contexts/AuthContext";
import {useRouter} from "next/router";

export default function Header(props) {
  let { userData, logoutFunction } = useAuthContext();
  const router = useRouter();

  return(
    <header className="text-red-500">
      <h1 
        className=""
        >First Draft</h1>
      <p>Header</p>
      {userData
        ?
        <div>
          <button 
            className="">
           {userData.first_name}
          </button>
          <button 
            className=""
            onClick={logoutFunction}>
            Sign Out
          </button>
        </div>
        :
        <div>
          <button 
            className=""
            onClick={()=>router.push("/login")}
            >
            Login
          </button>
        </div>
      }
    </header>
  );
}