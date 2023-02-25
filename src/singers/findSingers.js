import fetch from "node-fetch";
import { apiHeaders } from "../headers.js";
import { addNewSinger } from "./addNewSinger.js";

export const findSingers = async (singersArray) => {
    await Promise.all(
        singersArray.map(async (singer) => {
            const singerFromApi = await fetch(
                `https://pesnihi.com/api/get_exact_singers?name=${singer}`,
                {
                    headers: apiHeaders,
                }
            );

            const response = await singerFromApi.json();
            if (!singerFromApi.ok) return;

            if (!response[0]) {
                const newSingerResponse = await addNewSinger(singer, language);
                return `/api/singers/${newSingerResponse.id}`;
            }

            return `/api/singers/${response[0]?.id}`;
        })
    );
};
