const exceptions = [
    "COUPLET",
    "Couplet",
    "couplet",
    "COUPLET :",
    "COUPLET:",
    "Couplet :",
    "Couplet:",
    "couplet :",
    "couplet:",
    "1ER COUPLET :",
    "1ER COUPLET:",
    "1ER Couplet :",
    "1ER Couplet:",
    "1er Couplet :",
    "1er Couplet:",
    "1er COUPLET :",
    "1er COUPLET:",
    "1er couplet :",
    "1er couplet:",
    "2ème COUPLET :",
    "2ème COUPLET:",
    "2ème Couplet :",
    "2ème Couplet:",
    "2ème couplet :",
    "2ème couplet:",
    "HOOK",
    "Hook",
    "hook",
    "HOOK:",
    "Hook:",
    "hook:",
    "(HOOK)",
    "(Hook)",
    "(hook)",
    "CHOR",
    "Chor",
    "chor",
    "CHOR:",
    "Chor:",
    "chor:",
    "(CHOR)",
    "(Chor)",
    "(chor)",
    "CHORUS",
    "Chorus",
    "chorus",
    "CHORUS:",
    "Chorus:",
    "chorus:",
    "(CHORUS)",
    "(Chorus)",
    "(chorus)",
    "CUPLET",
    "Cuplet",
    "cuplet",
    "First Cuplet",
    "first cuplet",
    "First Couplet",
    "first couplet",
    "Vers",
    "Sample",
    "repeated",
    "Prodigy",
    "*",
    "SNIPPET",
    "ACOUSTIC",
    "REMIX",
    "RMX",
    "Tracklist",
    "Skit",
    "Live",
    "Live Version",
    "live version",
    "Live Vers",
    "live vers",
    "Instrumental",
    "Instrumental Version",
    "instrumental version",
    "Instrumental Vers",
    "instrumental vers",
    "REFRAIN",
    "Refrain",
    "refrain",
];

export const fixText = (text) => {
    let fixedText = text;

    exceptions.forEach((exception) => {
        fixedText = fixedText.replace(`(${exception})`, "");
        fixedText = fixedText.replace(`${exception}:`, "");
        fixedText = fixedText.replace(`${exception} :`, "");
        const firstUpper = exception.split("");
        firstUpper[0] = firstUpper[0].toUpperCase();
        fixedText = fixedText.replace(firstUpper.join(""), "");
        fixedText = fixedText.replace(exception.toLowerCase(), "");
        fixedText = fixedText.replace(exception.toUpperCase(), "");
    });

    return fixedText
        .replace(/&nbsp/g, " ")
        .replace(/[^A-Za-z0-9\s![?:,](")'\r\n|\r|\n]/g, "")
        .replace(/x\d+/g, "")
        .replace(/X\d+/g, "")
        .replace(/\d+x/g, "")
        .replace(/\d+X/g, "")
        .replace(/\[[^\]]*\]/g, "")
        .replace(/\{[^\}]*\}/g, "")
        .replace(/(\n{2,})/g, "\n\n");
};
