

//Base da URL: https://api.themoviedb.org/3/
//URL da API: /movie/now_playing?api_key=1773ea91513f34d54e30530a838cf60e&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;