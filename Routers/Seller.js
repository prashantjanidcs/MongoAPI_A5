require("dotenv").config();
const express = require("express");
const router = express.Router();
router.use(express.json());

const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("Mongo connected!"));

const SellerModel = require("../Models/Seller");

router.get("/", (req, res) => res.send("Seller APIs"));

//Add seller
router.post("/Add", async (req, res) => {
    const { seller } = req.body;
    SellerModel.create(seller);

    return res.json({data : "Seller added!"});
});

//Update seller
router.put("/Change/:id", async (req, res) => {
    const id = req.params.id;
    const product = req.body.product;

    const updatedSeller = await SellerModel.findOneAndUpdate(
        {SellerID : id}
        ,{ProductIDs : product}
        ,{new : true}
    );

    console.log(JSON.stringify(updatedSeller));
    return res.json({data : "Seller's product changed!"});
});

//Delete seller
router.delete("/Delete/:id", async (req, res) => {
    const id = req.params.id;
    const deletedSeller = await SellerModel.findOneAndDelete({SellerID : id});

    console.log(JSON.stringify(deletedSeller));
    return res.json({data : "Seller deleted!"});
});

//Seller list based on product name
router.get("/Product/:ProductName", async (req, res) => {
    const ProductName = req.params.ProductName;
    const ProductModel = require("../Models/Product");
    const product = await ProductModel.findOne({Title : ProductName});

    if(product == null || product.lenght < 0){
        return res.json({data : "No product found :(!"});
    } else {
        const sellerList = await SellerModel.find({ProductIDs : product["ProductID"]});

        if(sellerList.length === 0){
            return res.json({data : "No seller found :(!"});
        }

        return res.json({data : sellerList});
    }
});

//List all seller
router.get("/List", async (req, res) => {
    const SellerList = await SellerModel.find();

    if(SellerList.length === 0){
        return res.json({data : "No seller found :(!"});
    }
    return res.json({data : SellerList});
});
module.exports = router;