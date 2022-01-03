const mongoose = require("mongoose");
mongoose.pluralize(null);

const productSchema = mongoose.Schema({
    ProductID : String,
    Title : String,
    Price : String,
    Category : [{type: String}],
    CompanyID : String,
    SellerID : [{type : String}],
});

const productModel = mongoose.model("Product",productSchema);

module.exports = productModel;