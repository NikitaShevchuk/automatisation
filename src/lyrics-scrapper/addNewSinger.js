import fetch from "node-fetch";
import { apiHeaders } from "./headers.js";

export const addNewSinger = async (name, language) => {
    const creators = await fetch(`https://pesnihi.com/api/users.json}`, {
        headers: apiHeaders,
        method: "GET",
    }).json();

    const creator = creators.find((user) => user.id === 25);

    const body = {
        name,
        language,
        description: "",
        directData: "",
        romanizedName: "",
        creator,
    };

    const singer = await fetch(`https://pesnihi.com/api/singers}`, {
        headers: {
            ...apiHeaders,
            Referer: `https://pesnihi.com/api/singers`,
        },
        body: JSON.stringify(body),
        method: "POST",
    }).json();

    return singer;
};
