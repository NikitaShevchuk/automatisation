import fs from "fs";
import { addNewSong } from "./src/addNewSong.js";
import { getLyricsLinks } from "./src/getLyricsLinks.js";
import { lyricsScrapper } from "./src/lyricsScrapper.js";

const start = async () => {
    try {
        fs.readFile("lyrics.txt", "utf8", async (err, data) => {
            if (err || !data) throw err;

            const lyricsLinks = await getLyricsLinks(data);

            let addedCount = 0;

            await Promise.all(
                lyricsLinks.diff.map(async (diff, index) => {
                    setTimeout(async () => {
                        const songInfo = await lyricsScrapper(diff.link);
                        if (!songInfo) return;

                        const { added } = await addNewSong(songInfo);
                        if (added) addedCount++;

                        return added;
                    }, 200 * index);
                })
            );

            console.log(`Added ${addedCount}/${lyricsLinks.length}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
