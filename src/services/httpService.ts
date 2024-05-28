import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL + "/";

export function httpGet(url: string) {
    return axios.get(`${BASE_URL}${url}`)
}

export function httpPatch(url: string, body: any) {
    return axios.patch(`${BASE_URL}${url}`, body)
}