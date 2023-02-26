import fetch from "node-fetch";
import { apiHeaders } from "../headers.js";
import { addNewSinger } from "./addNewSinger.js";

export const findSingers = async (singersArray, language) => {
    const singersOrder = [];
    const singers = await Promise.all(
        singersArray.map(async (singer, index) => {
            await new Promise((resolve) => {
                setTimeout(resolve, 200 * index);
            });

            const singerFromApi = await fetch(
                `https://pesnihi.com/get_exact_singers?search=` + encodeURIComponent(singer),
                {
                    headers: { ...apiHeaders, "content-type": "application/x-www-form-urlencoded" },
                    body: null,
                    method: "POST",
                }
            );

            const response = await singerFromApi.json();

            if (!singerFromApi.ok) {
                throw new Error(`Singer "${singer}" not found, error response`);
            }

            if (!response[0]) {
                console.log(`Singer "${singer}" not found`);

                const newSingerResponse = await addNewSinger(singer, language);
                console.log(`Added new one with data: ${JSON.stringify(newSingerResponse)}`);
                return `/api/singers/${newSingerResponse.id}`;
            }
            singersOrder.push(response[0]?.id);

            return `/api/singers/${response[0]?.id}`;
        })
    );
    return {
        singersOrder,
        singers,
    };
};
