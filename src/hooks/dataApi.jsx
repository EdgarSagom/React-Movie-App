const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_APP_TOKEN;

export default async function getDataFromApi(url) {
    return await fetch(BASE_URL + url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        },
    }).then((result) => result.json());
}

