const Product = require("../../models/product.model.js");
const filterStatusHelper = require("../../helpers/filterStatus.js");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    };

    let keyword = req.query.keyword;

    if(keyword) {
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }

    if(req.query.status) {
        find.status = req.query.status;
    }
    
    const products = await Product.find(find);
    // console.log(products);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Product Management",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}