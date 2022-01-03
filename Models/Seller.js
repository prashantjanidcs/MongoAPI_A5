const mongoose = require("mongoose");
mongoose.pluralize(null);

const SellerSchema = mongoose.Schema({
    SellerID : String
    ,Name : String
    ,ProductIDs : [{type : String}]
});

const SellerModel = mongoose.model("Seller", SellerSchema);

module.exports = SellerModel;