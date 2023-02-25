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
                    await new Promise((resolve) => {
                        setTimeout(resolve, 200 * index);
                    });
                    const songInfo = await lyricsScrapper(diff.link);
                    if (!songInfo) return;

                    const { added } = await addNewSong(songInfo);
                    if (added) addedCount++;
                    return added;
                })
            );

            console.log(`Added ${addedCount}/${lyricsLinks.diff.length}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
