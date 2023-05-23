import { BACKEND_BASE_URL } from "@env";
import axios from "axios";

const getHeaders = (access_token) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
};

export const getEntries = async (access_token) => {
  try {
    const apiUrl = `${BACKEND_BASE_URL}/website-monitor`;
    const headers = getHeaders(access_token);
    const response = await axios.get(apiUrl, { headers });
    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
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
  const apiUrl = `${BACKEND_BASE_URL}/website-monitor`;
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
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
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
  const apiUrl = `${BACKEND_BASE_URL}/website-monitor/${RowKey}`;
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
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const deleteEntry = async (RowKey, access_token) => {
  const apiUrl = `${BACKEND_BASE_URL}/website-monitor/${RowKey}`;
  const headers = getHeaders(access_token);

  try {
    const response = await axios.delete(apiUrl, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const toggleEntry = async (RowKey, access_token) => {
  const apiUrl = `${BACKEND_BASE_URL}/website-monitor/${RowKey}/toggle`;
  const headers = getHeaders(access_token);

  try {
    const response = await axios.put(apiUrl, null, {
      headers: headers,
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
