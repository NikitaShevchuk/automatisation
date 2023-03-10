import axios from "axios";
import { cookie } from "../../cookie.js";

export const axiosAdminInstance = axios.create({
    baseURL: "https://pesnihi.com/api/",
    headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en,uk;q=0.9",
        "sec-ch-ua": '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        cookie: cookie,
        Referer: "https://pesnihi.com/api/sing/create",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "if-none-match": 'W/"e16bd5192b58098b7265b3f2779ea3aa"',
    },
});
