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

    const products = await Product        
        .find(find)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    // console.log(products);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Product Management",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    req.flash("success", "Change item status successfully!");
    // res.redirect("back");
    res.redirect(req.get("referer") || "/products");

}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    // console.log(req.body);
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch(type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", `Update items status successfully!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", `Update items status successfully!`);
            break;
        case "delete-selected":
            await Product.updateMany({ _id: ids }, { 
                deleted: true,
                deletedAt: new Date()
            });
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({ _id: id }, { position: position });
                req.flash("success", `Update items position successfully!`);
            }
            break;
        default:
            break;
    }

    res.redirect(req.get("referer") || "/products");
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { 
        deleted: true,
        deletedAt: new Date()
    });
    req.flash("success", `Delete items successfully!`);

    res.redirect(req.get("referer") || "/products");
}