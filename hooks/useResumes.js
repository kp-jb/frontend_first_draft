import axios from "axios";
import useSWR from 'swr';

export const ResumesUrl = process.env.NEXT_PUBLIC_RESUMES_URL;
import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorContext } from "@/contexts/ErrorContext";

export default function useResource() {
  const { tokens } = useAuthContext();
  const { errorMessage, updateError } = useErrorContext();
  const { data, error, mutate } = useSWR([ResumeUrl, tokens.accessToken], fetchResource);

  function getResumes(url) {
    if (!tokens.accessToken) {
      // TODO: Fetch new access token
      updateError(["*"],"Unable to fetch user resumes, access token has expired. New token has be requested. If problem persists, logout and login again.")
      return Promise.reject('Access token is missing');
    }
    let options = config('GET',ResumesUrl);
    return axios(options)
      .then(response => response.data)
      .catch(error => updateError(["*"],`Unable to fetch user resumes: ${error.message}`));
  };

  function createResume(info) {
    if (!tokens.accessToken) {
      // TODO: Fetch new access token
      updateError(["*"],"Unable to create resume record, access token has expired. New token has be requested. If problem persists, logout and login again.")
      return Promise.reject('Access token is missing');
    }
    let options = config('POST',ResumesUrl);
    options.body = JSON.stringify(info);
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["*"],`Unable to create record: ${error.message}`)); 
  }

  function deleteResume(id) {
    if (!tokens.accessToken) {
      // TODO: Fetch new access token
      updateError(["*"],"Unable to delete resume record, access token has expired. New token has be requested. If problem persists, logout and login again.")
      return Promise.reject('Access token is missing');
    }
    let options = config('DELETE',ResumesUrl+id+"/");
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["*"],`Unable to delete record: ${error.message}`)); 
  }

  function updateResume(resource) {
    if (!tokens.accessToken) {
      // TODO: Fetch new access token
      updateError(["*"],"Unable to update resume record, access token has expired. New token has be requested. If problem persists, logout and login again.")
      return Promise.reject('Access token is missing');
    }
    let options = config('PUT',ResumesUrl+resource.id+"/");
    options.body = JSON.stringify(resource);
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["*"],`Unable to update record: ${error.message}`)); 
  }

  function config(method, url) {
    return {
      method: method,
      url: url,
      headers: {
        Authorization: 'Bearer ' + tokens.accessToken,
        'Content-Type': 'application/json',
      },
    };
  };

  return {
    resources: data,
    error,
    loading: tokens.accessToken && !errorMessage && !data,
    createResume,
    deleteResume,
    updateResume,
  };
};