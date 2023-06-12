import axios from "axios";
import Constants from "expo-constants";
import log from "../Logger";

const BACKEND_BASE_URL = Constants.expoConfig.extra.BACKEND_BASE_URL;
const getHeaders = (access_token) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
};

const apiRequest = async (
  method,
  endpoint,
  access_token,
  dispatch,
  query = null
) => {
  const apiUrl = `${BACKEND_BASE_URL}${endpoint}`;
  const params = {
    headers: getHeaders(access_token),
    params: query ? query : null,
    timeout: 45000,
  };
  dispatch({ type: "INCREMENT_LOADING" });

  try {
    let response;
    if (["get", "delete", "head", "options"].includes(method)) {
      response = await axios[method](apiUrl, params);
    } else {
      response = await axios[method](apiUrl, null, params);
    }

    dispatch({ type: "DECREMENT_LOADING" });
    return response.data;
  } catch (error) {
    dispatch({ type: "DECREMENT_LOADING" });
    log.error(`Error during ${endpoint} API call: `, error);
    throw error;
  }
};

export const getEntries = async (access_token, dispatch) => {
  return apiRequest("get", "/page-patrol", access_token, dispatch);
};

export const addEntry = async (
  url,
  xpath,
  search_string,
  scrape_interval,
  access_token,
  dispatch
) => {
  const query = {
    url: url,
    xpath: xpath,
    search_string: search_string,
    scrape_interval: scrape_interval,
  };

  return await apiRequest(
    "post",
    "/page-patrol",
    access_token,
    dispatch,
    query
  );
};

export const updateEntry = async (
  RowKey,
  url,
  xpath,
  search_string,
  scrape_interval,
  access_token,
  dispatch
) => {
  const query = {
    url: url,
    xpath: xpath,
    search_string: search_string,
    scrape_interval: scrape_interval,
  };

  return apiRequest(
    "put",
    `/page-patrol/${RowKey}`,
    access_token,
    dispatch,
    query
  );
};

export const deleteEntry = async (RowKey, access_token, dispatch) => {
  return await apiRequest(
    "delete",
    `/page-patrol/${RowKey}`,
    access_token,
    dispatch
  );
};

export const toggleEntry = async (page_patrol_id, access_token, dispatch) => {
  return await apiRequest(
    "put",
    `/page-patrol/${page_patrol_id}/toggle`,
    access_token,
    dispatch
  );
};

export const getPatrolHistory = async (
  page_patrol_id,
  access_token,
  dispatch
) => {
  return await apiRequest(
    "get",
    `/page-patrol/${page_patrol_id}/history`,
    access_token,
    dispatch
  );
};

export const updateExpoPushToken = async (
  access_token,
  push_notification_token,
  dispatch
) => {
  const query = {
    expo_push_token: push_notification_token,
  };
  await apiRequest(
    "patch",
    "/page-patrol/update-push-token",
    access_token,
    dispatch,
    query
  );
};
