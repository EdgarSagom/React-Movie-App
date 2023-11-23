import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_APP_TOKEN;

export const getDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`,
            },
            params,
        });
        return data;

    } catch (err) {
        console.log(err);
        return err;
    };
};