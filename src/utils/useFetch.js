import userApi from "../apis/userApi";

export const get = (url) => {
    try {
        return userApi.get(url);
    } catch(e) {
        return e;
    }
}

export const post = (url, data) => {
    try {
        return userApi.post(url, data);
    } catch(e) {
        return e;
    }
}

export const put = (url, data) => {
    try {
        return userApi.put(url, data);
    } catch(e) {
        return e;
    }   
}

export const remove = (url) => {
    try {
        return userApi.delete(url);
    } catch(e) {
        return e;
    }   
}