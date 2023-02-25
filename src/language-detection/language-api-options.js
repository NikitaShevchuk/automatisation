export const getOptions = (text) => ({
    method: "POST",
    url: "https://text-analysis12.p.rapidapi.com/language-detection/api/v1.1",
    headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
    },
    data: `{"text":${text}}`,
});
