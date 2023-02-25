import axios from "axios";
import { load } from "cheerio";
import { getLyrics } from "genius-scraper";
import fetch from "node-fetch";
import { apiHeaders } from "../headers.js";
import { addNewSinger } from "./addNewSinger.js";
import { detectLanguage } from "./detect-language.js";
import { getAllSingers } from "./getAllSingers.js";

export const lyricsScrapper = async (geniusLink) => {
    const text = await getLyrics(geniusLink);

    const pageHtml = await axios.get(geniusLink).then((response) => response.data);

    const $ = load(pageHtml);

    const allSingers = await getAllSingers($);
    const singersArray = [$(".fPVhsa").text(), ...allSingers];

    const language = await detectLanguage(text);

    const singers = await Promise.all(
        singersArray.map(async (singer) => {
            const singerFromApi = await fetch(
                `https://pesnihi.com/api/singers.json?name=${singer}`,
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

    const title = $(".kwCpxe").text();

    singersArray.forEach((singer) => {
        if (!singer) console.log(`no singer found ${title}`);
    });

    if (!text) console.log(`no lyrics found ${title}`);

    return {
        text,
        title,
        singers,
        language,
    };
};
