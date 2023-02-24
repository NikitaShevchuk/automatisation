import { cookie } from "../cookie.js";

export const apiHeaders = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en,uk;q=0.9",
    "sec-ch-ua": '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    cookie: cookie,
    Referer: `https://pesnihi.com/sing/create`,
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "content-type": "application/merge-patch+json",
};
