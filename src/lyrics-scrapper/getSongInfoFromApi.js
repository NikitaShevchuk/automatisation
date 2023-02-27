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
        if (songInfoFromApi.artist_names.includes("&")) {
            const splitedNames = songInfoFromApi.artist_names.split("&");
            splitedNames.forEach((name) => {
                let newSinger = name.trim();
                if (newSinger.includes(",")) {
                    newSinger.split(",").forEach((singer) => {
                        allSingers.push(singer.trim());
                    });
                    return;
                }
                allSingers.push(newSinger);
            });
        } else if (songInfoFromApi.artist_names.includes("x")) {
            const splitedNames = songInfoFromApi.artist_names.split("x");
            splitedNames.forEach((name) => {
                let newSinger = name.trim();
                if (newSinger.includes(",")) {
                    newSinger.split(",").forEach((singer) => {
                        allSingers.push(singer.trim());
                    });
                    return;
                }
                allSingers.push(newSinger);
            });
        } else if (songInfoFromApi.artist_names.includes("X")) {
            const splitedNames = songInfoFromApi.artist_names.split("X");
            splitedNames.forEach((name) => {
                let newSinger = name.trim();
                if (newSinger.includes(",")) {
                    newSinger.split(",").forEach((singer) => {
                        allSingers.push(singer.trim());
                    });
                    return;
                }
                allSingers.push(newSinger);
            });
        } else {
            allSingers.push(songInfoFromApi.artist_names);
        }
    } else {
        if (songInfoFromApi.artist_names.split("(Ft.")[0].includes("&")) {
            const splitedNames = songInfoFromApi.artist_names.split("(Ft.")[0].split("&");
            splitedNames.forEach((name) => {
                let newSinger = name.trim();
                if (newSinger.includes(",")) {
                    newSinger.split(",").forEach((singer) => {
                        allSingers.push(singer.trim());
                    });
                    return;
                }
                allSingers.push(newSinger);
            });
        } else if (songInfoFromApi.artist_names.split("(Ft.")[0].includes("&")) {
            const splitedNames = songInfoFromApi.artist_names.split("(Ft.")[0].split("&");
            splitedNames.forEach((name) => {
                let newSinger = name.trim();
                if (newSinger.includes(",")) {
                    newSinger.split(",").forEach((singer) => {
                        allSingers.push(singer.trim());
                    });
                    return;
                }
                allSingers.push(newSinger);
            });
        } else if (songInfoFromApi.artist_names.split("(Ft.")[0].includes("x")) {
            const splitedNames = songInfoFromApi.artist_names.split("(Ft.")[0].split("x");
            splitedNames.forEach((name) => {
                let newSinger = name.trim();
                if (newSinger.includes(",")) {
                    newSinger.split(",").forEach((singer) => {
                        allSingers.push(singer.trim());
                    });
                    return;
                }
                allSingers.push(newSinger);
            });
        } else if (songInfoFromApi.artist_names.split("(Ft.")[0].includes("X")) {
            const splitedNames = songInfoFromApi.artist_names.split("(Ft.")[0].split("X");
            splitedNames.forEach((name) => {
                let newSinger = name.trim();
                if (newSinger.includes(",")) {
                    newSinger.split(",").forEach((singer) => {
                        allSingers.push(singer.trim());
                    });
                    return;
                }
                allSingers.push(newSinger);
            });
        } else {
            allSingers.push(songInfoFromApi.artist_names.split("(Ft.")[0].trim());
        }
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
