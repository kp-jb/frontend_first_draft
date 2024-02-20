import axios from "axios";

import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorContext } from "@/contexts/ErrorContext";

export default function useChatGPT(prompt) {
  const { tokens } = useAuthContext();
  const { updateError } = useErrorContext();

  let options = {
    method:"POST",
    url: process.env.NEXT_PUBLIC_API_URL + "api/v1/openai/",
    headers: {
      'Authorization': 'Bearer ' + tokens.access,
      'Content-Type': 'application/json',
    },
    body: {'prompt':prompt},
  };

  return axios(options)
    .then(response => {
      return response.data})
    .catch(error => updateError(["coverletter"],`Failed request:\n\n${error.message}`));
};
