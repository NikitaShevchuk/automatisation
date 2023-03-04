import { load } from "cheerio";
import open from "open";
import { axiosAdminInstance } from "./axios-instances/axiosAdminInstance.js";
import { axiosInstance } from "./axios-instances/axiosInstance.js";
import { patchRequest } from "./patchTheSong.js";

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

const getResponseInstance = async ({
    songId,
    title,
    text,
    language,
    singers,
    extendedTitle,
    singersOrder,
    slug,
}) => {
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
    response.singersOrder = singersOrder;
    response.slug = slug;
    response.source = 'a:2:{s:3:"url";s:0:"";s:5:"title";s:0:"";}';

    return response;
};

export const addNewSong = async ({ title, text, singers, language, singersOrder, slug }) => {
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
    if (title.includes("[")) {
        extendedTitle = title.split("[")[1].split("]")[0];
        title = title.split("[")[0];
    }

    const responseInstance = await getResponseInstance({
        songId,
        title,
        extendedTitle,
        text,
        language,
        singers,
        singersOrder,
        slug,
    });

    const result = await patchRequest(songId, responseInstance);

    if (result.ok) open(`https://pesnihi.com/sing/create/${songId}`);

    console.log(
        result.ok
            ? `+ Added new song with id ${songId} ${title}`
            : `- Failed to add new song with id ${songId} ${title}. Reason: ${result.status}`
    );

    return { added: result.ok };
};
