import axios from "axios";

export const get = async(url) => {
    try {
        return axios.get(url);
    } catch(e) {
        return e
    }
}

export const post = async(url, data) => {
    try {
        return axios.post(url, data);
    } catch(e) {
        console.error(e);
    }
}

export const put = async(url, data) => {
    try {
        return axios.put(url, data);
    } catch(e) {
        console.error(e);
    }   
}

export const remove = async(url) => {
    try {
        return axios.delete(url);
    } catch(e) {
        console.error(e);
    }   
}