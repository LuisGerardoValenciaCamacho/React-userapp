import axios from "axios";
import { config } from "./useUtils";

export const get = (url, auth = false) => {
    try {
        return axios.get(url, auth ? config() : {});
    } catch(e) {
        return e;
    }
}

export const post = (url, data, auth = false) => {
    try {
        return axios.post(url, data, auth ? config() : {});
    } catch(e) {
        return e;
    }
}

export const put = (url, data, auth = false) => {
    try {
        return axios.put(url, data, auth ? config() : {});
    } catch(e) {
        return e;
    }   
}

export const remove = (url, auth = false) => {
    try {
        return axios.delete(url, auth ? config() : {});
    } catch(e) {
        return e;
    }   
}