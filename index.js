import fs from "fs";
import { addNewSong } from "./src/addNewSong.js";
import { lyricsScrapper } from "./src/lyricsScrapper.js";

const start = async () => {
    try {
        fs.readFile("lyrics.txt", "utf8", (err, data) => {
            if (err || !data) throw err;

            data.split("\r").forEach((line, index) => {
                setTimeout(async () => {
                    const songInfo = await lyricsScrapper(line);
                    if (!songInfo) return;

                    // await addNewSong(songInfo);
                }, 200 * index);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

start();
