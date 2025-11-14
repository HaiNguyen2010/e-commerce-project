module.exports = (query)  => {
    let objectSearch = {};
    let keyword = query.keyword;

    if(keyword) {
        objectSearch.keyword = keyword;
        const regex = new RegExp(keyword, "i");
        objectSearch.regex = regex;
    }

    return objectSearch;
}