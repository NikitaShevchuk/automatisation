import cheerio from "cheerio";
import p from "phin";

export const getLyrics = async (url) => {
    const res = await p(url);
    try {
        const fullHTML = res.body;

        const $ = cheerio.load(fullHTML);
        let lyrics = $("div.lyrics").text();

        if (!lyrics) {
            $("[class^=Lyrics__Container]").each((i, el) => {
                const html = $(el).html();
                const lined = html.replace(/<br\s*[\/]?>/gi, "\n");
                const stripped = lined.replace(/<[^>]+>/gi, "");
                const trimmed = stripped.trim();
                lyrics += stripped;
            });
        }
        if (!lyrics || fullHTML.includes("Lyrics for this song have yet to be")) {
            console.log("Failed to capture lyrics or none present");
            if (fullHTML.includes("Burrr!")) console.log("could not find url ", url);
            return null;
        }

        return lyrics;
    } catch (e) {
        console.log(e);
        return null;
    }
};
