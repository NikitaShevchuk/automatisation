export const getAllSingers = async ($) => {
    const singers = [];

    let featured = $(".dWcYSx")?.find(".fognin");
    let wrapper;
    if (featured) {
        featured.each((_, element) => {
            if ($(element)?.find(".kOJa-dB").text().includes("Featuring")) {
                wrapper = $(element);
            }
        });
    }
    if (wrapper) {
        const singer = wrapper.find(".fUgcxf").text();
        if (singer) singers.push(singer);
    }
    return singers;
};
