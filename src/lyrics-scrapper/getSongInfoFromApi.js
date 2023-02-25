import axios from "axios";

export const getSongInfoFromApi = async (songId) => {
    const songInfoFromApi = await axios
        .get(`https://api.genius.com/songs/${songId}`, {
            headers: {
                Authorization: `Bearer ${process.env.GENIUSAPI_KEY}`,
            },
        })
        .then((response) => response.data.response.song);

    let allSingers = [];

    if (!songInfoFromApi.artist_names.includes("(Ft.")) {
        allSingers.push(songInfoFromApi.artist_names);
    } else {
        allSingers.push(songInfoFromApi.artist_names.split("(Ft.")[0].trim());
        songInfoFromApi.featured_artists.forEach((artist) => {
            allSingers.push(artist.name);
        });
    }

    return {
        title: songInfoFromApi.title,
        allSingers: allSingers.map((singer) => {
            if (singer.includes("(")) {
                console.log(`Removed "(" from "${singer}"`);
                return singer.split("(")[0].trim();
            }
            return singer;
        }),
    };
};
