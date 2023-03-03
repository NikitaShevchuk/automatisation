import axios from "axios";

const getSongs = async (songId) => {
    return await axios
        .get(`https://api.genius.com/songs/${songId}`, {
            headers: {
                Authorization: `Bearer ${process.env.GENIUSAPI_KEY}`,
            },
        })
        .then((response) => response.data.response.song);
};

export const getSongInfoFromApi = async (songId) => {
    const songInfoFromApi = await getSongs(songId);

    const { artist_names } = songInfoFromApi;

    let allSingers = [];

    function splitString(inputString) {
        let splitSymbols = ["&", "(?<!\\S)x(?!\\S)", "(?<!\\S)X(?!\\S)", "/", ","]; // <- add symbols by which artist names will be separated
        let pattern = new RegExp(splitSymbols.join("|"), "g");
        let result = inputString.split(pattern);
        return result;
    }

    const splitBySymbolAndAdd = (namesString) => {
        const artists = splitString(namesString);
        artists.forEach((artist) => {
            if (artist) allSingers.push(artist.trim());
        });
    };

    if (!artist_names.includes("(Ft.")) {
        splitBySymbolAndAdd(artist_names);
    } else {
        splitBySymbolAndAdd(artist_names.split("(Ft.")[0]);
        songInfoFromApi.featured_artists.forEach((artist) => {
            allSingers.push(artist.name);
        });
    }

    const fixedArtist = allSingers[0]
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^A-Za-z0-9-]/g, "");
    const fixedTitle = songInfoFromApi.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^A-Za-z0-9-]/g, "");
    const slug = `${fixedArtist.split("")[0]}/${fixedArtist}/${fixedTitle}.html`;

    return {
        title: songInfoFromApi.title,
        allSingers: allSingers.map((singer) => {
            if (singer.includes("(")) {
                console.log(`Removed "(" from "${singer}"`);
                return singer.split("(")[0].trim();
            }
            return singer;
        }),
        slug,
    };
};
