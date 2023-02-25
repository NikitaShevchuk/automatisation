import fetch from "node-fetch";
import { apiHeaders } from "../headers.js";

export const addNewSinger = async (name, language) => {
    const creatorsFromApi = await fetch(`https://pesnihi.com/api/users.json`, {
        headers: apiHeaders,
        method: "GET",
    });

    const creators = await creatorsFromApi.json();
    const creator = creators.find((user) => user.id === 25);

    const body = {
        name,
        language,
        description: "",
        directData: "",
        romanizedName: "",
        creator: `api/users/${creator.id}`,
    };
    if (!name) throw new Error("No name found");

    const singer = await fetch(`https://pesnihi.com/api/singers`, {
        headers: {
            ...apiHeaders,
            Referer: `https://pesnihi.com/api/singers`,
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
    });
    const response = await singer.json();

    if (singer.status !== 201) {
        console.log(singer);
        throw new Error();
    }

    console.log(`+++++++ Added new singer ${name}`);

    return response;
};
