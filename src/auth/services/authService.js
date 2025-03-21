import { post } from "../../utils/useFetch"

export const loginUser = (userLogin) => {
    return post("http://localhost:5500/login", JSON.stringify(userLogin));
}