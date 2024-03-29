import axios from "axios";

import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorContext } from "@/contexts/ErrorContext";

export default function useChatGPT() {
  const { tokens } = useAuthContext();
  const { updateError } = useErrorContext();

  function getChatGPT(prompt){
    let options = {
      method:"POST",
      url: process.env.NEXT_PUBLIC_API_URL + "api/v1/openai/",
      headers: {
        'Authorization': 'Bearer ' + tokens.access,
        'Content-Type': 'application/json',
      },
      data: {'prompt':prompt},
    };
    return axios(options)
      .then(response => {
        updateError([""],``,false);
        return response})
      .catch(error => updateError(["coverletter"],`Failed to generate cover letter:\n\n${error.message}`,false));
  };

  return { getChatGPT };
};
