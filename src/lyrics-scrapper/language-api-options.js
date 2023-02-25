export const getOptions = (text) => ({
    method: "POST",
    url: "https://text-analysis12.p.rapidapi.com/language-detection/api/v1.1",
    headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "389dba40b2msh1e8e5e40431f851p13123fjsn893a443fadb7",
        "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
    },
    data: `{"text":${text}}`,
});
