const Product = require("../../models/product.model.js");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    let filterStatus = [
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "Active",
            status: "active",
            class: ""
        },
        {
            name: "Inactive",
            status: "inactive",
            class: ""
        }
    ]

    let find = {
        deleted: false
    };

    if(req.query.status) {
        const index = filterStatus.findIndex((item) => {
            return item.status == req.query.status;
        })
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex((item) => {
            return item.status == "";
        });
        filterStatus[index].class = "active";
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
    });
}