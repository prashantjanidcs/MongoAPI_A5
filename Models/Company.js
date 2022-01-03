const mongoose = require("mongoose");
mongoose.pluralize(null);

const CompanySchema = mongoose.Schema({
    CompanyID : String,
    Name : String,
    ProductIDs : [{type : String}],
});

const CompanyModel = mongoose.model("Company", CompanySchema);

module.exports = CompanyModel;