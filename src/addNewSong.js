import { load } from "cheerio";
import { axiosAdminInstance } from "./axiosAdminInstance.js";
import { axiosInstance } from "./axiosInstance.js";
import { patchTheSong } from "./patchTheSong.js";

const getSongId = async () => {
    let songId;
    const pageHtml = await axiosInstance.get("sing/create").then((response) => response.data);
    const $ = load(pageHtml);

    $("body")
        .find("script")
        .each((_, scriptTag) => {
            const scriptBody = $(scriptTag).text();
            if (!scriptBody || !scriptBody.includes("window.currentId = '")) return;
            songId = scriptBody.split("window.currentId = '")[1]?.replace("';\n", "");
        });

    return songId;
};

const getResponseInstance = async ({ songId, title, text, language, singers, extendedTitle }) => {
    const response = await axiosAdminInstance
        .get(`sings/${songId}.json`)
        .then((response) => response.data);

    delete response.author;

    response.title = title;
    response.text = text;
    response.singers = singers;
    response.language = language;
    response.isPublish = true;
    response.extendedTitle = extendedTitle;

    return response;
};

export const addNewSong = async ({ title, text, singers, language }) => {
    const songId = await getSongId();
    if (!songId || songId === "undefined") {
        console.log("id is not found");
        return;
    }

    let extendedTitle = null;
    if (title.includes("(")) {
        extendedTitle = title.split("(")[1].split(")")[0];
        title = title.split("(")[0];
    }

    const responseInstance = await getResponseInstance({
        songId,
        title,
        extendedTitle,
        text,
        language,
        singers,
    });

    const result = await patchTheSong(songId, responseInstance);

    console.log(
        result.ok
            ? `+ Added new song with id ${songId} ${title}`
            : `- Failed to add new song with id ${songId} ${title}. Reason: ${await result.json()
                  .message}`
    );

    return { added: result.ok };
};
