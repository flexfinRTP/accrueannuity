import axios from 'axios'; //get request to server
import { setAuthHeader, removeAuthHeader } from './common';

export const get = async ( //get func
  url,
  params,
  shouldSetAuthHeader = true,
  shouldRemoveAuthHeader = false
) => {
  if (shouldSetAuthHeader) {
    setAuthHeader();
  }
  const result = await axios.get(url, params);
  if (shouldRemoveAuthHeader) {
    removeAuthHeader();
  }
  return result;
};

export const post = async ( //post func
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

export const patch = async ( //patch func
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
