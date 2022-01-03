const express = require('express');
const app = express();
const port = 5000;

const productRoute = require("./Routers/Product");
const companyRoute = require("./Routers/Company");
const sellerRoute = require("./Routers/Seller");

app.use("/Product", productRoute);
app.use("/Company", companyRoute);
app.use("/Seller", sellerRoute);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));