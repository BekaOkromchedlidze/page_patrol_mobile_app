// import { BACKEND_BASE_URL } from "@env";
import axios from "axios";
import Constants from "expo-constants";

const BACKEND_BASE_URL = Constants.expoConfig.extra.BACKEND_BASE_URL;
const getHeaders = (access_token) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
};

//TODO: Use a logger instead
const logErrors = (error) => {
  console.error("Error during API call:", error);
  console.error("Error response data:", error.response.data);
  console.error("Error response status:", error.response.status);
  console.error("Error response headers:", error.response.headers);
};

export const getEntries = async (access_token) => {
  try {
    const apiUrl = `${BACKEND_BASE_URL}/page-patrol`;
    const headers = getHeaders(access_token);
    const response = await axios.get(apiUrl, { headers });
    return response.data;
  } catch (error) {
    logErrors(error);
    throw error;
  }
};

export const addEntry = async (
  url,
  xpath,
  search_string,
  scrape_interval,
  access_token
) => {
  const apiUrl = `${BACKEND_BASE_URL}/page-patrol`;
  const headers = getHeaders(access_token);
  const query = {
    url: url,
    xpath: xpath,
    search_string: search_string,
    scrape_interval: scrape_interval,
  };

  try {
    const response = await axios.post(apiUrl, null, {
      headers: headers,
      params: query,
    });
    return response.data;
  } catch (error) {
    logErrors(error);
    throw error;
  }
};

export const updateEntry = async (
  RowKey,
  url,
  xpath,
  search_string,
  scrape_interval,
  access_token
) => {
  const apiUrl = `${BACKEND_BASE_URL}/page-patrol/${RowKey}`;
  const headers = getHeaders(access_token);
  const query = {
    url: url,
    xpath: xpath,
    search_string: search_string,
    scrape_interval: scrape_interval,
  };
  try {
    const response = await axios.put(apiUrl, null, {
      headers: headers,
      params: query,
    });
    return response.data;
  } catch (error) {
    logErrors(error);
    throw error;
  }
};

export const deleteEntry = async (RowKey, access_token) => {
  const apiUrl = `${BACKEND_BASE_URL}/page-patrol/${RowKey}`;
  const headers = getHeaders(access_token);

  try {
    const response = await axios.delete(apiUrl, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    logErrors(error);
    throw error;
  }
};

export const toggleEntry = async (page_patrol_id, access_token) => {
  const apiUrl = `${BACKEND_BASE_URL}/page-patrol/${page_patrol_id}/toggle`;
  const headers = getHeaders(access_token);

  try {
    const response = await axios.put(apiUrl, null, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    logErrors(error);
    throw error;
  }
};

export const getPatrolHistory = async (page_patrol_id, access_token) => {
  try {
    const apiUrl = `${BACKEND_BASE_URL}/page-patrol/${page_patrol_id}/history`;
    const headers = getHeaders(access_token);
    const response = await axios.get(apiUrl, { headers });
    return response.data;
  } catch (error) {
    logErrors(error);
    throw error;
  }
};

export const updateExpoPushToken = async (
  access_token,
  push_notification_token
) => {
  const apiUrl = `${BACKEND_BASE_URL}/page-patrol/update-push-token`;
  const headers = getHeaders(access_token);
  const query = {
    expo_push_token: push_notification_token,
  };

  try {
    const response = await axios.patch(apiUrl, null, {
      headers: headers,
      params: query,
    });
    return response.data;
  } catch (error) {
    logErrors(error);
    throw error;
  }
};
