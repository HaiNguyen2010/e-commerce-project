const Product = require("../../models/product.model.js");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination.js");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);
    
    let find = {
        deleted: false
    };

    if(req.query.status) {
        find.status = req.query.status;
    }
    
    if(objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // Pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination = await paginationHelper(
        req.query, 
        {
        limitItems: 5,
        currentPage: 1,
        }, 
        countProducts
    );
    // End Pagination

    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    // console.log(products);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Product Management",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}