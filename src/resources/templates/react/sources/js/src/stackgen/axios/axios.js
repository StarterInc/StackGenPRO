import axios from 'axios';

export default axios.create({
    baseURL: '{{serverhost}}:{{serverport}}/'
});
