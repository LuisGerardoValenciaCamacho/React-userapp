import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:5500/api/user"
});


userApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
    }
    return config;
});

export default userApi;