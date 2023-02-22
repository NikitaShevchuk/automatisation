import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://pesnihi.com/",
    headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en,uk;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "_ga=GA1.1.974410053.1677012331; __cf_bm=zJ_SztVIfIiapBAND07FJ8t_b89Rx.c7UyLCRnAH83w-1677012333-0-AfZLCL6Gek3xscunxDcQveNMtxC7m1yOhzpHP3Lpz774+rT/lB8TgdjJpZLaWYBiux0SlNhco6iKrlPjGRPc1DKJrFTNdrrMhyJCrcKAl1ZPjPY24NHr1ovD3RugRU4xqHyRq8Wo6TES9aFTg6xflGQ=; _locale=uk; PHPSESSID=m6crecqnejjebhnsflt0tb6u2i;",
        "Referer": "https://pesnihi.com/sing/list",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    }
})