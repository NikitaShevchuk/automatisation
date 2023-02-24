import { getLyrics } from "genius-scraper";

export const lyricsScrapper = async (geniusLink) => {
    const lyrics = await getLyrics(geniusLink);

    console.log(lyrics + "\n\n===================\n\n");

    return lyrics;
};
