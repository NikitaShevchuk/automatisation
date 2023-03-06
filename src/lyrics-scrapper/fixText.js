const exceptions = [
    "припев",
    "ORKIESTRA",
    "Akustycznie",
    "(Zwrotka)",
    "(Zwrotka 1)",
    "Zwrotka #1",
    "Zwrotka #2",
    "Zwrotka#1",
    "Zwrotka#2",
    "Zwrotka II",
    "Zwrotka I",
    "1ER Couplet",
    "1er Couplet",
    "1er COUPLET",
    "1er couplet",
    "2ème COUPLET",
    "2ème Couplet",
    "2ème couplet",
    "First Cuplet",
    "first cuplet",
    "First Couplet",
    "first couplet",
    "[Couplet 1]:",
    "[Couplet 2]:",
    "couplet 1",
    "couplet 2",
    "couplet",
    "hook",
    "chorus",
    "Chorus",
    "chor",
    "cuplet",
    "sample ",
    "(Repeat)",
    "repeated",
    "repeat",
    "Prodigy",
    "*",
    "SNIPPET",
    "ACOUSTIC",
    "REMIX",
    "RMX",
    "Tracklist",
    "Skit",
    "Live Version",
    "live version",
    "Live Vers",
    "live vers",
    "Live",
    "Instrumental Version",
    "instrumental version",
    "Instrumental Vers",
    "instrumental vers",
    "Instrumental",
    "\x91",
    "bis",
    "pont",
    "bridge",
    "(?)",
    "Pre-Refrain 1",
    "Pre-Refrain 2",
    "pre-refrain 1",
    "pre-refrain 2",
    "|Refrain x2]",
    "(Refrain x2)",
    "(Refrain x1)",
    "REFRAIN :",
    "Refrain :",
    "refrain x1",
    "refrain x2",
    "refrain",
    "{Refren x2]",
    "(Refren)",
    "(refren)",
    "REFREN (2x):",
    "refren",
    "(Refräng)",
    "Refräng",
    "(Refrão)",
    "(refrão)",
    "Refrão",
    "refrão",
    "Ref./ x2",
    "Ref./ x4",
    "(Refr. 4x)",
    "Refr:",
    "Ref.:",
    "Ref:",
    "ref.",
    "ReF",
    "ref",
    "Ref",
    "intro",
    "lyrics",
    "{Verse 1]",
    "(Verse 1)",
    "(Verse 2)",
    "(1. verse)",
    "(2. verse)",
    "VERSE : 1",
    "VERSE : 2",
    "Verse : 1",
    "Verse : 2",
    "Verse 1:",
    "Verse 2:",
    "verse 1:",
    "verse 2:",
    "Verse 1",
    "Verse 2",
    "verse 1",
    "verse 2",
    "verse",
    "(Vers 1)",
    "1 VERS:",
    "2 VERS:",
    "Vers 1 -",
    "Vers 2 -",
    "Vers 1",
    "Vers 2",
    "Vers 3",
    "Vers 4",
    "Vers",
    "vers",
    "{Czoug]",
    "PRE-CHORUS",
    "pre-chorus",
    "Pre-Chorus",
    "(Solo)",
    "(solo)",
    "solo",
    "OMKVÆD:",
    "OMKVÆD",
    "Omkvæd 1",
    "Omkvæd 2",
    "Omkvæd 3",
    "Omkvæd 4",
    "c-Stykke:",
    "C STYKKE:",
    "Dialog 1",
    "Dialog 2",
    "(....)",
    "(...)",
    "(…)",
    "(..)",
    "(x)",
    "()",
    "( )",
    "[]",
    "[ ]",
    "I I I",
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
        .replace(/\./g, "")
        .replace(/[^A-Za-z0-9\s![?:,]\("\)'\r\n|\r|\n]/g, "")
        .replace(/-{2,}/g, "")
        .replace(/\*/g, "")
        .replace(/\[[^\]]*\]/g, "")
        .replace(/\[[^\]]*\](?::\s*|\s*:\s*)/g, "")
        .replace(/\{[^\}]*\}/g, "")

        .replace(/\(x\s*\d+\)/g, "")
        .replace(/\(\*\s*\d+\)/g, "")
        .replace(/\*\s*\d+/g, "")
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
        .replace(/\n\?*\n/g, "\n")
        .replace(/\d+:/g, "")
        .replace(/(\n{2,})/g, "\n\n");
};
