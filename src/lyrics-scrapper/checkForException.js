const exceptions = [
    "Remix",
    "REMIX",
    "remix",
    "*",
    "Skit",
    "SKIT",
    "skit",
    "Cover",
    "COVER",
    "cover",
    "Demo",
    "DEMO",
    "demo",
    "Snippet",
    "SNIPPET",
    "snippet",
    "RMX",
    "rmx",
    "Tracklist",
    "TRACKLIST",
    "tracklist",
    "Live On",
    "live on",
    "Live At",
    "live at",
    "- live",
    "- Live",
    "Live Version",
    "live version",
    "Acoustic",
    "ACOUSTIC",
    "acoustic",
    "Intro",
    "Outro",
    "intro",
    "outro",
    "INTRO",
    "OUTRO",
];

export const checkForException = (title) => {
    let hasException = false;
    exceptions.forEach((exception) => {
        if (title.includes(exception)) {
            hasException = true;
        }
    });
    return hasException;
};
