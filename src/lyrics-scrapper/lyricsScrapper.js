import axios from "axios";
import { load } from "cheerio";
import { getLyrics } from "genius-scraper";
import { detectLanguage } from "../laguage-detection/detect-language.js";
import { findSingers } from "../singers/findSingers.js";
import { getAllSingers } from "../singers/getAllSingers.js";

export const lyricsScrapper = async (geniusLink) => {
    const text = await getLyrics(geniusLink);

    const pageHtml = await axios.get(geniusLink).then((response) => response.data);

    const $ = load(pageHtml);

    const allSingers = await getAllSingers($);
    const singersArray = [$(".fPVhsa").text(), ...allSingers];

    const language = await detectLanguage(text);

    const singers = await findSingers(singersArray);

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
