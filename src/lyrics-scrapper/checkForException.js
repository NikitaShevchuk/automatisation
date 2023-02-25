const exceptions = ["Remix", "remix", "*"];

export const checkForException = (title) => {
    let hasException = false;
    exceptions.forEach((exception) => {
        if (title.includes(exception)) {
            hasException = true;
        }
    });
    return hasException;
};
