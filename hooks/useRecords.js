import axios from "axios";
import useSWR from 'swr';

export const RecordsUrl = process.env.NEXT_PUBLIC_API_URL + "api/v1/records/";
import { useAuthContext } from "@/contexts/AuthContext";
import { useErrorContext } from "@/contexts/ErrorContext";
// import { isTokenValid } from "@/hooks/useTokenExpired";

export default function useRecords() {
  const { tokens } = useAuthContext();
  const { errorMessage, updateError } = useErrorContext();
  const { data, error, mutate } = useSWR([RecordsUrl, tokens], getRecords);

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
      .catch(error => updateError(["records","editandsave"],`Unable to fetch user records: ${error.message}`));
  };

  function createRecord(info) {
    // console.log(info)
    // if (!info.hasOwnProperty('name') || !info.hasOwnProperty('is_resume')) {
    //   // Handle the case where 'name' or 'is_resume' is missing from the body
    //   console.error("Missing 'name' or 'is_resume' in the request body");
    //   return Promise.reject(new Error("Missing 'name' or 'is_resume' in the request body"));
    // }
    let options = config(RecordsUrl);
    options.method = 'POST';
    options.body = JSON.stringify(info);
    // console.log(options.body);

    return axios(options)
      .then(response => {
        mutate();
        return response.status;
      })
      // .catch(error => updateError(["editandsave"],`Unable to create record: ${error.message}`)); 
      .catch(error => {
        updateError(["editandsave"],`Unable to create record: ${error.message}`);
        return Promise.reject(error)
      });
  }

  function deleteRecord(id) {
    let options = config(RecordsUrl+id+"/");
    options.method = 'DELETE';
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["records","editandsave"],`Unable to delete record: ${error.message}`)); 
  }

  function updateRecord(resource) {
    let options = config(RecordUrl+resource.id+"/");
    options.method = 'PUT';
    options.body = JSON.stringify(resource);
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["records","editandsave"],`Unable to update record: ${error.message}`)); 
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