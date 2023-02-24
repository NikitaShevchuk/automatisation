import axios from "axios";
import { apiHeaders } from "./headers.js";

export const getLyricsLinks = async (pageId) => {
    return await axios
        .get(`https://pesnihi.com/api/compares/${pageId}`, { headers: apiHeaders })
        .then((response) => response.data);
};
