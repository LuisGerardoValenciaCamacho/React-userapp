export const BASE_URL = "http://localhost:5500/api/user";

export const config = () => {
    return {
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    }
}