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
   Product = require("./models/product"), // Require productSchema
   User = require("./models/user"); // Require userSchema

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set("views", "public/views");
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
//    // Create product and insert to DB
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
         img: "https://picsum.photos/800/?image=" + i * 10,
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
         res.render("index", { products: allProducts});
   });
});

app.get("/searching", (req, res) => {
   let value = req.query.search;
   console.log(value)
})

app.get("/products/:id", (req, res) => {
   // Find the product with id
   Product.findById(req.params.id, (err, foundProduct) => {
      if (err) {
         res.render("pageNotFound")
      }
      else
         res.render("products/show", { product: foundProduct, addedProducts: addedProducts });
   })
});

app.get("/checkout", (req, res) => {
   let error = req.query.error;
   res.render("checkout", { error: error })
});

app.post("/checkout/register", (req, res) => {
   if (req.body.email &&
      req.body.username &&
      req.body.firstName &&
      req.body.lastName &&
      req.body.address &&
      req.body.password === req.body.passwordConf) {
      let userData = {
         email: req.body.email,
         username: req.body.username,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         address: req.body.address,
         password: req.body.password,
      }
      // Create user and insert to DB
      User.create(userData, (err, newUser) => {
         if (err)
            res.redirect("/checkout?error=" + err)
         else
            res.redirect("/checkout/confirmation")
      })
   } else {
      let msg = "Passwords don't match!";
      res.redirect("/checkout?error=" + msg)
   }
});

app.get("/checkout/confirmation", (req, res) => {
   res.render("confirmation")
});

app.get("/documentation", (req, res) => {
   res.render("documentation.ejs")
});
// Error route
app.get("/*", (req, res) => {
   res.render("pageNotFound");
})
// ================================================================================
// START SERVER
// ================================================================================
app.listen(3000, () => console.log("FakeStore Server ON"));