import axios from "axios";

const clientAxios = axios.create({
    baseURL: import.meta.env.VITE_URL_BACK_DEPLOY
})

export const config = {
    headers: {
        'Content-Type': 'application/json',
    }
}

export default clientAxios