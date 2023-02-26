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

    let includesGenius = false;

    allSingers.forEach((singer) => {
        if (singer.includes("Genius")) {
            includesGenius = true;
        }
        if (!singer) {
            console.log(`No name found. Title: ${title}. Link: ${geniusLink}`);
            throw new Error(`No name found`);
        }
    });

    if (includesGenius) {
        console.log("Genius in title was found:" + ` ${title}`);
        return undefined;
    }

    const singers = await findSingers(allSingers, language);

    if (!text) {
        console.log(`no lyrics found ${title}'`);
        return undefined;
    }

    if (text.match(/\[\?\]/g)) {
        console.log(`Invalid text (includes "[?]") ${title}`);
        return undefined;
    }

    text = text
        .replace(/[^A-Za-z0-9\s![?:,](")'\r\n|\r|\n]/g, "")
        .replace(/x\d+/g, "")
        .replace(/X\d+/g, "")
        .replace(/\\n\\n\\n/g, "\n\n")
        .replace(/&nbsp/g, " ");

    return {
        text,
        title,
        singers,
        language,
    };
};
