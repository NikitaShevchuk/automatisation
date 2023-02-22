import axios from 'axios';

export const axiosAdminInstance = axios.create({
    baseURL: "https://pesnihi.com/api/",
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
        "cookie": "_ga=GA1.1.974410053.1677012331; PHPSESSID=m6crecqnejjebhnsflt0tb6u2i; __cf_bm=x1_d_2ZokyZLDMo8wbWDBaW77cUDHgJTRJ7U3iMAGFw-1677014927-0-AYYnjVwr1IhiT522JkPq5zuS8N2naPu35uBF6PsjDlsREy/od6P/OekRzca/faYYGZkhSB51Uf96f4RfkmVK8xFsLVp2aTPH1LDqRhzEArx2yyO9BcKHkDXCDkBEPFYbFcT+/++RS46MHQQmHisuiKM=; _locale=pl; _ga_WV47C9QQSP=GS1.1.1677015060.2.1.1677015294.0.0.0",
        "Referer": "https://pesnihi.com/sing/create",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "if-none-match": "W/\"e16bd5192b58098b7265b3f2779ea3aa\""
    }
})

export const axiosModifierInstance = (songId) => axios.create({
    baseURL: "https://pesnihi.com/api/",
    headers: {
        "Host": "pesnihi.com",
        "user-agent": "insomnia/2022.7.5",
        "cookie": "PHPSESSID=m6crecqnejjebhnsflt0tb6u2i",
        "accept": "application/json, text/plain, */*",
        "accept-language": "en,uk;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": 1,
        "cookie": "_ga=GA1.1.974410053.1677012331; PHPSESSID=m6crecqnejjebhnsflt0tb6u2i; __cf_bm=x1_d_2ZokyZLDMo8wbWDBaW77cUDHgJTRJ7U3iMAGFw-1677014927-0-AYYnjVwr1IhiT522JkPq5zuS8N2naPu35uBF6PsjDlsREy/od6P/OekRzca/faYYGZkhSB51Uf96f4RfkmVK8xFsLVp2aTPH1LDqRhzEArx2yyO9BcKHkDXCDkBEPFYbFcT+/++RS46MHQQmHisuiKM=; _locale=pl; _ga_WV47C9QQSP=GS1.1.1677015060.2.1.1677015294.0.0.0",
        "referer": `https://pesnihi.com/sing/create/${songId}`,
        "referrer-policy": "strict-origin-when-cross-origin",
        "content-type": "application/merge-patch+json",
        "authorization": "Basic Og==",
        "content-length": "3241"
    }
})