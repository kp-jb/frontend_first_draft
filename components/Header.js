import { useAuthContext } from "@/contexts/AuthContext";
import {useRouter} from "next/router";

export default function Header(props) {
  let { tokens, userData, logoutFunction } = useAuthContext();
  const router = useRouter();

  // if (tokens){
  //   console.log("Header", tokens);
  // }
  return(
      <>
      <div className="flex flex-row">
        <header className="m-3 text-3xl text-ivory">
        <h1 
          className="font-sans">
            First Draft
        </h1>
        <div className="flex gap-3 text-xs">
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
        </div>
      </header>
      </div>
      
    </>
  );
}