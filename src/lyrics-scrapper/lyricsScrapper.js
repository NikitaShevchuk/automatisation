import axios from "axios";
import { load } from "cheerio";
import { detectLanguage } from "../language-detection/detect-language.js";
import { findSingers } from "../singers/findSingers.js";
import { checkForException } from "./checkForException.js";
import { getLyrics } from "./getLyrics.js";
import { getSongInfoFromApi } from "./getSongInfoFromApi.js";

export const lyricsScrapper = async (geniusLink) => {
    let text = await getLyrics(geniusLink);

    const pageHtml = await axios.get(geniusLink).then((response) => response.data);

    const $ = load(pageHtml);

    let songId;

    $('link[rel="alternate"]')
        .get()
        .forEach((element) => {
            const href = $(element).attr("href");
            const partOfLink = "/songs/";
            if (href.includes(partOfLink)) {
                songId = href.split(partOfLink)[1];
            }
        });

    const { allSingers, title } = await getSongInfoFromApi(songId);

    if (checkForException(title)) {
        console.log("Title is not valid:" + ` ${title}`);
        return undefined;
    }

    if (allSingers.length > 6) {
        console.log("Too many singers:" + ` ${title}`);
        return undefined;
    }

    const language = await detectLanguage(text);

    allSingers.forEach((singer) => {
        if (!singer) {
            console.log(`No name found. Title: ${title}. Link: ${geniusLink}`);
            throw new Error(`No name found`);
        }
    });

    const singers = await findSingers(allSingers, language);

    if (!text) {
        console.log(`no lyrics found ${title}'`);
        return undefined;
    }

    text = text
        .replace(/[^A-Za-z0-9\s![?:,](")'\r\n|\r|\n]/g, "")
        .replace("X2", "")
        .replace("x2", "")
        .replace("[?]", "")
        .replace("\n\n\n", "\n\n")
        .replace("&nbsp", " ");
    console.log(text);
    return {
        text,
        title,
        singers,
        language,
    };
};
