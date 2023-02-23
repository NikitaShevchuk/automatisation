import fs from "fs";
import { addNewSong } from "./src/addNewSong.js";
import { scrapTheLyrics } from "./src/scrapTheLyrics.js";

const start = async () => {
    try {
        fs.readFile("lyrics.txt", "utf8", (err, data) => {
            if (err || !data) throw err;

            data.split("\r").forEach((line, index) => {
                setTimeout(async () => {
                    const songInfo = await scrapTheLyrics(line);
                    if (!songInfo) return;

                    await addNewSong(songInfo);
                }, 200 * index);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

start();
