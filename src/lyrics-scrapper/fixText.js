const exceptions = [
    "couplet",
    "1ER Couplet",
    "1er Couplet",
    "1er COUPLET",
    "1er couplet",
    "2ème COUPLET",
    "2ème Couplet",
    "2ème couplet",
    "hook",
    "chor",
    "chorus",
    "cuplet",
    "First Cuplet",
    "first cuplet",
    "First Couplet",
    "first couplet",
    "vers ",
    "sample ",
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
    "refrain",
    "",
    "\x91",
    "bis",
    "pont",
    "bridge",
    "(?)",
    "couplet 1",
    "couplet 2",
    "(Refrain x2)",
    "(Refrain x1)",
    "intro",
    "refrain x1",
    "refrain x2",
    "lyrics",
    "verse",
    "verse 1",
    "verse 2",
    "PRE-CHORUS",
    "pre-chorus",
    "Pre-Chorus",
    "pre-refrain 1",
    "pre-refrain 2",
    "Pre-Refrain 1",
    "Pre-Refrain 2",
    "ref",
    "ref.",
    "ReF",
    "refren",
    "solo",
    "(…)",
    "(..)",
    "(...)",
    "()",
];

export const fixText = (text) => {
    let fixedText = text.replace(/\([^()]*:[^()]*\)/g, "");

    exceptions.forEach((exception) => {
        fixedText = fixedText.replace(`(${exception})`, "");
        fixedText = fixedText.replace(`${exception}:`, "");
        fixedText = fixedText.replace(`${exception} :`, "");
        fixedText = fixedText.replace(`(${exception}) :`, "");
        fixedText = fixedText.replace(`(${exception}):`, "");

        // lower case
        fixedText = fixedText.replace(`(${exception.toLowerCase()})`, "");
        fixedText = fixedText.replace(`${exception.toLowerCase()}:`, "");
        fixedText = fixedText.replace(`${exception.toLowerCase()} :`, "");
        fixedText = fixedText.replace(`(${exception.toLowerCase()}) :`, "");
        fixedText = fixedText.replace(`(${exception.toLowerCase()}):`, "");

        // upper case
        fixedText = fixedText.replace(`(${exception.toUpperCase()})`, "");
        fixedText = fixedText.replace(`${exception.toUpperCase()}:`, "");
        fixedText = fixedText.replace(`${exception.toUpperCase()} :`, "");
        fixedText = fixedText.replace(`(${exception.toUpperCase()}) :`, "");
        fixedText = fixedText.replace(`(${exception.toUpperCase()}):`, "");

        // with first upper case
        const firstUpperWithBrackets = exception.split("");
        firstUpperWithBrackets[0] = firstUpperWithBrackets[0].toUpperCase();
        fixedText = fixedText.replace(`(${firstUpperWithBrackets.join("")})`, "");
        fixedText = fixedText.replace(`${firstUpperWithBrackets.join("")}:`, "");
        fixedText = fixedText.replace(`${firstUpperWithBrackets.join("")} :`, "");
        fixedText = fixedText.replace(`(${firstUpperWithBrackets.join("")}) :`, "");
        fixedText = fixedText.replace(`(${firstUpperWithBrackets.join("")}):`, "");

        const firstUpper = exception.split("");
        firstUpper[0] = firstUpper[0].toUpperCase();
        fixedText = fixedText.replace(firstUpper.join(""), "");
        fixedText = fixedText.replace(exception.toLowerCase(), "");
        fixedText = fixedText.replace(exception.toUpperCase(), "");

        fixedText = fixedText.replace(exception, "");
    });

    return fixedText
        .replace(/&nbsp/g, " ")
        .replace(/\d+\./g, "")
        .replace(/[^A-Za-z0-9\s![?:,](")'\r\n|\r|\n]/g, "")
        .replace(/-{2,}/g, "")
        .replace(/\*/g, "")
        .replace(/\./g, "")
        .replace(/\[[^\]]*\]/g, "")
        .replace(/\[[^\]]*\](?::\s*|\s*:\s*)/g, "")
        .replace(/\{[^\}]*\}/g, "")

        .replace(/\(x\s*\d+\)/g, "")
        .replace(/\(X\s*\d+\)/g, "")
        .replace(/\(\d+\s*x\)/g, "")
        .replace(/\(\d+\s*X\)/g, "")
        .replace(/x\s*\d+/g, "")
        .replace(/X\s*\d+/g, "")
        .replace(/\d+\s*x/g, "")
        .replace(/\d+\s*X/g, "")

        .replace(/\(×\s*\d+\)/g, "")
        .replace(/\(\d+\s*×\)/g, "")
        .replace(/×\s*\d+/g, "")
        .replace(/\d+\s*×/g, "")

        .replace(/^\s*$\n/gm, "\n")
        .replace(/^:*$\n/gm, "\n")
        .replace(/\[\]/g, "")
        .replace(/\n\d+\n/g, "\n")
        .replace(/(\n{2,})/g, "\n\n");
};
