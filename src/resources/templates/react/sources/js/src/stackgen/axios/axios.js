import axios from 'axios';

export default axios.create({
    baseURL: 'http://{{serviceHost}}:{{servicePort}}/'
});
