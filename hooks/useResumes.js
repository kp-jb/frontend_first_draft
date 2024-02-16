import axios from "axios";
import useSWR from 'swr';

export const ResumesUrl = process.env.NEXT_PUBLIC_RESUMES_URL;
import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorContext } from "@/contexts/ErrorContext";
// import { isTokenValid } from "@/hooks/useTokenExpired";

export default function useResource() {
  const { tokens } = useAuthContext();
  const { errorMessage, updateError } = useErrorContext();
  const { data, error, mutate } = useSWR([ResumesUrl, tokens], getResumes);

  function getResumes(url) {
    // TODO: handle token refresh here
    // if (!isTokenValid(tokens)) {
    //   updateError(["*"],"Unable to fetch user resumes, access token has expired. New token has be requested. If problem persists, logout and login again.")
    //   return Promise.reject('Access token is missing');
    // }
    let options = config(ResumesUrl);
    return axios(options)
      .then(response => {
        return response.data})
      .catch(error => updateError(["*"],`Unable to fetch user resumes: ${error.message}`));
  };

  function createResume(info) {
    let options = config(ResumesUrl);
    options.method = 'POST';
    options.body = JSON.stringify(info);
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["*"],`Unable to create record: ${error.message}`)); 
  }

  function deleteResume(id) {
    let options = config(ResumesUrl+id+"/");
    options.method = 'DELETE';
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["*"],`Unable to delete record: ${error.message}`)); 
  }

  function updateResume(resource) {
    let options = config(ResumesUrl+resource.id+"/");
    options.method = 'PUT';
    options.body = JSON.stringify(resource);
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["*"],`Unable to update record: ${error.message}`)); 
  }

  function config(url) {
    return {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + tokens.access,
        'Content-Type': 'application/json',
      },
    };
  };

  return {
    data: data,
    // loading: tokens.accessToken && !data,
    createResume,
    deleteResume,
    updateResume,
  };
};