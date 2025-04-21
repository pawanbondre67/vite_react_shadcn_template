import axios from 'axios';

const BaseURL = 'http://localhost:5000/api';
export default axios.create({
    baseURL: BaseURL,
    withCredentials: true // Add this
});

export const axiosPrivate = axios.create({
    baseURL:  BaseURL,
    headers: {
        'Content-Type': 'application/json',
        
    },
    withCredentials: true,

});

