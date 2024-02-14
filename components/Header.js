import { useAuthContext } from "@/contexts/AuthContext";

export default function Header(props) {
  let { user, logoutFunction } = useAuthContext();
  return(
    <header className="text-red-500">
      <h1 
        className=""
        >First Draft</h1>
      <p>Header</p>
      {user
        ?
        <div>
          <button 
            className="">
           {user.first_name}
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
            className="">
            Login
          </button>
        </div>
      }
    </header>
  );
}