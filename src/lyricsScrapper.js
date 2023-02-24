import axios from "axios";
import { load } from "cheerio";
import { getLyrics } from "genius-scraper";
import fetch from "node-fetch";
import { apiHeaders } from "./headers.js";

const getAllSingers = async ($) => {
    const singers = [];

    let featured = $(".dWcYSx")?.find(".fognin");
    let wrapper;
    if (featured) {
        featured.each((_, element) => {
            if ($(element)?.find(".kOJa-dB").text().includes("Featuring")) {
                wrapper = $(element);
            }
        });
    }
    if (wrapper) {
        const singer = wrapper.find(".fUgcxf").text();
        if (singer) singers.push(singer);
    }
    return singers;
};

export const lyricsScrapper = async (geniusLink) => {
    const text = await getLyrics(geniusLink);

    const pageHtml = await axios.get(geniusLink).then((response) => response.data);

    const $ = load(pageHtml);

    const allSingers = await getAllSingers($);
    const singersArray = [$(".PcIZE").text(), ...allSingers];

    console.log(singersArray);

    let language;
    const singers = await Promise.all(
        singersArray.map(async (singer) => {
            const singerFromApi = await fetch(
                `https://pesnihi.com/api/singers.json?name=${singer}`,
                {
                    headers: apiHeaders,
                }
            );

            const response = await singerFromApi.json();

            if (!singerFromApi.ok || singerFromApi.status !== 200 || !response[0]) return;

            if (response[0]?.language) language = response[0]?.language;

            return `/api/singers/${response[0]?.id}`;
        })
    );

    const title = $(".kwCpxe").text();

    console.log(text + "\n\n===================\n\n");

    return {
        text,
        title,
        singers,
        language,
    };
};
