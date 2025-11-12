const Product = require("../../models/product.model.js");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });

    // console.log(products);
    products.forEach((item) => {
        item.priceNew = Math.round(item.price - (item.price * item.discountPercentage) / 100);
    })

    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang Sản phẩm",
        products: products
    });
}