import fetch from "node-fetch";
import { apiHeaders } from "./headers.js";

export const patchTheSong = async (songId, responseInstance) =>
    await fetch(`https://pesnihi.com/api/sings/${songId.trim()}`, {
        headers: {
            ...apiHeaders,
            Referer: `https://pesnihi.com/sing/create/${songId}`,
        },
        body: JSON.stringify(responseInstance),
        method: "PATCH",
    });
