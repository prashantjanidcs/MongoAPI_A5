require("dotenv").config();
const express = require("express");
const router = express.Router();
router.use(express.json());

const mongoose = require("mongoose");
mongoose
    .connect((process.env.MONGOURL))
    .then(()=>console.log("Mongo connected!"));

const ProductModel = require("../Models/Product");

router.get("/", (req, res) => res.send("Product APIs"));

//Add product
router.post("/Add", (req, res) => {
    const { product } = req.body;
    ProductModel.create(product);

    return res.json({data : "Product Added!"});
});

//Update product
router.put("/Change/:id", async (req, res) => {
    const ProductID = req.params.id;
    const category = req.body.Category;
    const UpdatedProduct = await ProductModel.findOneAndUpdate(
        {ProductID : ProductID}
        ,{Category : category}
        ,{new : true}
    );

    console.log(JSON.stringify(UpdatedProduct));    
    return res.json({data : "Product's category updated!"});
});

//Delete product
router.delete("/Delete/:id", async (req, res) => {
    const id = req.params.id;

    const deletedProduct = await ProductModel.findOneAndDelete({ ProductID : id});
    console.log(JSON.stringify(deletedProduct));
    
    return res.json({data : `Product ${deletedProduct["Title"]} deleted!`});
});

//List all product
router.get("/List", async (req, res) => {
    const productList = await ProductModel.find();

    if(productList.length === 0){
        return res.json({data : "No product found :(!"});
    }
    return res.json({data : productList});
});

//Companywise product
router.get("/Company/:id", async (req, res) => {
    const companyID = req.params.id;
    const ProductList = await ProductModel.find({CompanyID : companyID});
    return res.json({data : ProductList});
});

//Sellerwise product
router.get("/Seller/:id", async (req, res) => {
    const SellerID = req.params.id;
    const ProductList = await ProductModel.find({SellerID : SellerID});
    return res.json({data : ProductList});
});
module.exports = router;