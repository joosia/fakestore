require('dotenv').config(); // Get database connection details
// ================================================================================
// NODE PACKAGES
// ================================================================================
const express = require("express"), // Framework for web applications
   app = express(),
   //faker = require("faker"), // For generating fake data
   bodyParser = require("body-parser"), // For parsing form data from client side
   path = require("path"), // For defining custom paths to express
   mongoose = require("mongoose"), // For using MongoDB
   Product = require("./models/product"); // Require productSchema

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// ================================================================================
// DATABASE 
// ================================================================================
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection
   .on('connected', () => {
      console.log(`Mongoose connection open on ${process.env.DATABASE}`);
   })
   .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
   });

// Create some fake products and add to DB
// let products = [];
// createProducts();
// products.forEach(product => {
//    Product.create(product, (err, addedProduct) => {
//       if (err)
//          console.log(err)
//       else
//          console.log(addedProduct);
//    });
// });

function createProducts() {
   let product;
   for (let i = 0; i < 20; i++) {
      product = {
         id: faker.random.number(),
         img: "https://picsum.photos/200/?image=" + i * 10,
         name: faker.commerce.productName(),
         description: faker.lorem.paragraph(),
         price: faker.commerce.price()
      };
      products.push(product);
   }
}

// ================================================================================
// ROUTES
// // ================================================================================
app.get("/", (req, res) => {
   Product.find({}, (err, allProducts) => {
      if (err)
         console.log(err)
      else
         res.render("index", { products: allProducts });
   });
});

app.get("/searching", (req, res) => {
   let value = req.query.search;
   console.log(value)
})

app.get("/products/:id", (req, res) => {
   // Find the product with id
   res.render("product", { productID: productID })
});

app.get("/checkout", (req, res) => {

});

app.get("/checkout/confirmation", (req, res) => {
   res.render("confirmation")
});

app.get("/documentation", (req, res) => {
   res.render("documentation.ejs")
});
// ================================================================================
// START SERVER
// ================================================================================
app.listen(3000, () => console.log("FakeStore Server ON"));