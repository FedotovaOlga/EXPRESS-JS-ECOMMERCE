const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productController = require("./controllers/product.controller.js");
const app = express();
const port = process.env.PORT || 4000;

// db connection
mongoose
  .connect(`mongodb://0.0.0.0:27017/projet`)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("error connecting to", err);
  });

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", cors(), async (req, res) => {
  res.send("This is working");
});

app.get("/products", cors(), productController.getAllProducts);

app.post("/products", cors(), productController.addNewProduct);

app.delete("/products/:id", cors(), productController.deleteProduct);

app.put("/products/:id", cors(), productController.updateProduct);

app.use((req, res) => {
  res.end("404");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// app.get('/products', cors(), async (req, res) => {
//     try {
//       const products = await getAllProducts(req, res); // Assurez-vous que cette fonction existe et renvoie les produits attendus
//       res.json(products);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error retrieving products');
//     }
//   });

// app.post("/post_name", async (req, res)=>{
//     let {name} = req.body
//     console.log(name)
//     })

// app.get('/myhome', cors(), async (req, res)=>{
//     res.send('This is the data for the home page')
// })
