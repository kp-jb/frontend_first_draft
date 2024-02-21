import { useContentContext } from "@/contexts/ContentContext";
import { useRouter } from "next/router";

export default function Response() {
  let generated_content = useContentContext();
  console.log(generated_content);
  console.log(generated_content.content)
  return (
    <>
      <p>{generated_content.content}</p>
      <button>Edit</button>
      <button>Generate New Query</button>
    </>
  );
}
