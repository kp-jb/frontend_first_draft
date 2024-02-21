import { useAuthContext } from "@/contexts/AuthContext";
import {useRouter} from "next/router";
import Head from "next/head";

export default function Header(props) {
  let { tokens, userData, logoutFunction } = useAuthContext();
  const router = useRouter();

  // if (tokens){
  //   console.log("Header", tokens);
  // }
  return(
      <>
        <Head>
          <title>First Draft</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-row">
        <header className="m-3 text-3xl text-gray-200">
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