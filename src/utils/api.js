import axios from 'axios'; //GET, requests to an API end point, server
import { setAuthHeader, removeAuthHeader } from './common'; //imports auth page headers

export const get = async ( //get func
  url,
  params,
  shouldSetAuthHeader = true,
  shouldRemoveAuthHeader = false
) => {
  if (shouldSetAuthHeader) { //if shouldSetAuthHeader is true, remove the display for header
    setAuthHeader();
  }
  const result = await axios.get(url, params); //if shouldRemoveAuthHeader is false, display the header
  if (shouldRemoveAuthHeader) {
    removeAuthHeader();
  }
  return result;
};

export const post = async ( //post async func, send props and params to server, update result
  url,
  params,
  shouldSetAuthHeader = true,
  shouldRemoveAuthHeader = false
) => {
  if (shouldSetAuthHeader) {
    setAuthHeader();
  }
  const result = await axios.post(url, params);
  if (shouldRemoveAuthHeader) {
    removeAuthHeader();
  }
  return result;
};

export const patch = async ( //patch async func, send props and params to server, update result
  url,
  params,
  shouldSetAuthHeader = true,
  shouldRemoveAuthHeader = false
) => {
  if (shouldSetAuthHeader) {
    setAuthHeader();
  }
  const result = await axios.patch(url, params);
  if (shouldRemoveAuthHeader) {
    removeAuthHeader();
  }
  return result;
};
