import { useAuthContext } from "@/contexts/AuthContext";
import { useContentContext } from "@/contexts/ContentContext";
import { useRouter } from "next/router";

export default function Response() {
    const generated_content = useContentContext();
    const { userData } = useAuthContext();
    const router = useRouter();

    return (
        <div>
            {userData &&
                <div>
                    <p>{generated_content.content}</p>
                    <button 
                        className="border"
                        onClick={ () => router.push("/editandsave")}
                    >
                        Edit and/or Save
                    </button>
                    <button 
                        className="border"
                        onClick={ () => router.push("/query")}
                    >
                        New Query
                    </button>
                </div>
            }
        </div>
    );
}
