import axios from "axios";
import { load } from "cheerio";
import fetch from "node-fetch";
import { apiHeaders } from "./headers.js";

const divToRemove = `<div data-exclude-from-selection="true" class="InreadContainer__Container-sc-19040w5-0 cujBpY PrimisPlayer__InreadContainer-sc-1tvdtf7-0 juOVWZ"><div class="PrimisPlayer__Container-sc-1tvdtf7-1 csMTdh"></div></div>`;

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

export const scrapTheLyrics = async (lyricsLink, songId) => {
    const pageHtml = await axios.get(lyricsLink).then((response) => response.data);

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

    let lyricsContainer;
    let brPositions;
    $('div[data-lyrics-container="true"]').each((index, element) => {
        if (element) {
            lyricsContainer += $(element).text();
            brPositions = $(element)
                .html()
                .split(/<br\s*[\/]?>/gi);
        }
    });

    if (!lyricsContainer) {
        console.log("No lyrics found");
        return;
    }

    let regex = /<br\s*[\/]?>/gi;
    let text = lyricsContainer
        ?.replace("undefined", "")
        ?.replace("x2", "")
        ?.replace(divToRemove, "")
        ?.replace(regex, "\r\n");
    brPositions.forEach((item) => {
        if (item.split("")[0]?.includes("<")) return;
        text = text.replace(item, `${item}\r\n`);
    });

    text = text
        .replace(/\]/g, (match) => match + "\r\n")
        .replace(/\[/g, (match) => "\r\n" + match)
        .replace("\r\n\r\n", "");

    const title = $(".kwCpxe").text();

    return {
        text,
        title,
        singers,
        language,
    };
};
