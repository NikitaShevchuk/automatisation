const exceptions = [
    "Remix",
    "remix",
    "*",
    "Skit",
    "skit",
    "Cover",
    "cover",
    "Demo",
    "demo",
    "Snippet",
    "snippet",
    "RMX",
    "rmx",
    "Tracklist",
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
    "acoustic",
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
