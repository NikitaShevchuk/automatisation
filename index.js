import "dotenv/config";
import fs from "fs";
import { addNewSong } from "./src/addNewSong.js";
import { getLyricsLinks } from "./src/lyrics-scrapper/getLyricsLinks.js";
import { lyricsScrapper } from "./src/lyrics-scrapper/lyricsScrapper.js";

const start = async () => {
    try {
        fs.readFile("lyrics.txt", "utf8", async (err, data) => {
            if (err || !data) throw err;

            const lyricsLinks = await getLyricsLinks(data);

            let addedCount = 0;

            await Promise.all(
                lyricsLinks.diff.map(async (diff, index) => {
                    // if (index > 10) return true;

                    await new Promise((resolve) => {
                        setTimeout(resolve, 5000 * index);
                    });
                    const songInfo = await lyricsScrapper(diff.link);

                    if (!songInfo) return true;

                    try {
                        const { added } = await addNewSong(songInfo);

                        if (added) addedCount++;
                        return added;
                    } catch (error) {
                        console.log(error);
                        return true;
                    }
                })
            );

            console.log(`Added ${addedCount}/${lyricsLinks.diff.length}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
