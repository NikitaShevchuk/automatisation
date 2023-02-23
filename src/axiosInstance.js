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
        "cookie": "_ga=GA1.1.974410053.1677012331; _locale=pl; __cf_bm=XAHAiQdrgROSu7438PzrTFW8OVsf8zxqgYW52DmP7_Y-1677096850-0-AV1IKGLbvb4kzd6c/ytE6wb7oKuRIAUdyZW9ABF7XE5XNanUxsa8gUSlA9UzrtszyqzSPvgXzdTrS1djTAN9RmiHEssdQSya3nteqePgk65KZRe4cv6U8trbuVpHOUBP8xeuJsJFNKuBigJhnmxehHg=; PHPSESSID=dvr4v55q0ifndto4on72erinet; _ga_WV47C9QQSP=GS1.1.1677096844.4.1.1677096923.0.0.0",
        "Referer": "https://pesnihi.com/sing/list",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    }
})