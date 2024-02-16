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
      .catch(error => updateError(["*"],`Unable to fetch user records: ${error.message}`));
  };

  function createRecord(info) {
    let options = config(RecordsUrl);
    options.method = 'POST';
    options.body = JSON.stringify(info);
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["*"],`Unable to create record: ${error.message}`)); 
  }

  function deleteRecord(id) {
    let options = config(RecordsUrl+id+"/");
    options.method = 'DELETE';
    return axios(options)
      .then(response => {
        mutate()
        return response.data})
      .catch(error => updateError(["*"],`Unable to delete record: ${error.message}`)); 
  }

  function updateRecord(resource) {
    let options = config(RecordUrl+resource.id+"/");
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
    recordsData: data || [],
    // loading: tokens.accessToken && !data,
    createRecord,
    deleteRecord,
    updateRecord,
  };
};