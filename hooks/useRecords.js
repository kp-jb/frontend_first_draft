import axios from "axios";
import useSWR from 'swr';
import {useRouter} from "next/router";

export const RecordsUrl = process.env.NEXT_PUBLIC_API_URL + "api/v1/records/";
import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorContext } from "@/contexts/ErrorContext";
import { useContentContext } from "@/contexts/ContentContext";

export default function useRecords() {
  const { tokens } = useAuthContext();
  const { errorMessage, updateError } = useErrorContext();
  const { data, error, mutate } = useSWR([RecordsUrl, tokens], getRecords);
  const { updateContent } = useContentContext();
  const router = useRouter();
  

  function getRecords(url) {
    // TODO: handle token refresh here
    // if (!isTokenValid(tokens)) {
    //   updateError(["*"],"Unable to fetch user resumes, access token has expired. New token has be requested. If problem persists, logout and login again.")
    //   return Promise.reject('Access token is missing');
    // }
    let options = config(RecordsUrl);
    return axios(options)
      .then(response => {
        return response.data})
      .catch(error => updateError(["records","editandsave"],`Unable to fetch user records:\n\n${error.message}`));
  };

  function createRecord(info) {
    let options = config(RecordsUrl);
    options.method = 'POST';
    options.data = JSON.stringify(info);

    return axios(options)
      .then(response => {
        mutate();
        if (response.status==201){
          updateContent("id", null);
          updateContent("content_name", "");
          updateContent("content","");
          router.push("/records");
        } else {
          throw new Error(`Response status ${response.status}.`);
        }; 
        return})
      .catch(error => {
        updateError(["records","editandsave"],`Unable to create record:\n\n${error.message}`);
      });
  }

  function deleteRecord(id) {
    let options = config(RecordsUrl+id+"/");
    options.method = 'DELETE';
    
    return axios(options)
      .then(response => {
        mutate()
        if (response.status==204){
          updateContent("id", null);
          updateContent("content_name", "");
          updateContent("content","");
          router.push("/records");
        } else {
          throw new Error(`Response status ${response.status}.`);
        };
        return})
      .catch(error => updateError(["records"],`Unable to delete record:\n\n${error.message}`)); 
  }

  function updateRecord(resource) {
    let options = config(RecordsUrl+resource.id+"/");
    options.method = 'PUT';
    options.data = JSON.stringify(resource);
    return axios(options)
      .then(response => {
        mutate()
        if (response.status==200){
          updateContent("id", null);
          updateContent("content_name", "");
          updateContent("content","");
          router.push("/records");
        } else {
          throw new Error(`Response status ${response.status}.`);
        };
        return})
      .catch(error => updateError(["records","editandsave"],`Unable to update record:\n\n${error.message}`)); 
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
    recordsData: data || [],
    // loading: tokens.accessToken && !data,
    createRecord,
    deleteRecord,
    updateRecord,
  };
};