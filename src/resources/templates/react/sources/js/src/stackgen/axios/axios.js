import axios from 'axios';

let stackgenId = '';

export default axios.create({
  // baseURL: process.env.REACT_APP_SG_SERVICE_ENDPOINT,
  baseURL: 'http://{{serverhost}}:{{serverport}}/', 
  headers: {
    'X-StackGen-ID': stackgenId,
    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
    'Accept': "*/*"
  },

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  // withCredentials: true, // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
});
