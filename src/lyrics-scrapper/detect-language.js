import axios from "axios";
import { getLanguageByCode } from "./getLanguageByCode.js";
import { getOptions } from "./language-api-options.js";

export const detectLanguage = async (text) => {
    const languages = await axios.request(getOptions(text)).then((response) => response.data);

    const languageCode = Object.keys(languages.language_probability)[0];

    return getLanguageByCode(languageCode);
};
