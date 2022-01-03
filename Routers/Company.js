require("dotenv").config();
const express = require("express");
const router = express.Router();
router.use(express.json());

const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("Mongo connected!"));

const CompanyModel = require("../Models/Company");

router.get("/", (req, res) => res.send("Company APIs"));

//Add company
router.post("/Add", async (req, res) => {
    const { company } = req.body;
    CompanyModel.create(company);

    return res.json({data : "Company added!"});
});

//Update company
router.put("/change/:id", async (req, res) => {
    const id = req.params.id;
    const product = req.body.product;

    const updatedCompany = await CompanyModel.findOneAndUpdate(
        {CompanyID : id}
        ,{ProductIDs : product}
        ,{new : true}
    )
    console.log(JSON.stringify(updatedCompany));
    return res.json({data : "Company's product changed!"});
});

//Delete company
router.delete("/Delete/:id", async (req, res) => {
    const id = req.params.id;
    const deletedCompany = await CompanyModel.findOneAndDelete({CompanyID: id});

    console.log(JSON.stringify(deletedCompany));
    return res.json({data : "Company deleted!"});
});

//Company list based on product name
router.get("/Product/:ProductName", async (req, res) => {
    const ProductName = req.params.ProductName;
    const ProductModel = require("../Models/Product");
    const product = await ProductModel.findOne({Title : ProductName});
    
    if(product == null || product.length < 0){
        return res.json({data : "No product found :(!"});
    }else{
        const companyList = await CompanyModel.find({ProductIDs : product["ProductID"]});
        if(companyList.length === 0){
            return res.json({data : "No company found :(!"});
        }
        return res.json({data : companyList});
    } 

});

//List all company
router.get("/List", async (req, res) => {
    const CompanyList = await CompanyModel.find();

    if(CompanyList.length === 0){
        return res.json({data : "No company found :(!"});
    }

    return res.json({data : CompanyList});
});

module.exports = router;