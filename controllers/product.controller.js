const Product = require("../models/product.model");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("ERROR_Find-Product", err);
  }
};

// Add a new product
const addNewProduct = async (req, res) => {
  try{
    const newProduct = new Product (req.body);
    await newProduct.save();
    console.log("product saved", newProduct);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.error("Error registering product:", err);
  }
};

// Update a product
const updateProduct = async (req, res) => {
  console.log("Attempt to update product");
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {new: true});
    console.log("Updating product with ID:", req.params.id);
    console.log("Update data:", updateData);

    if (!updatedProduct) {
      console.log("Update data:", updateData);
      console.log("Updating product with ID:", req.params.id);
      return res.status(404).json({message: "Product not found"});
    }

    res.status(200).json(updatedProduct);
    console.log("Updating product with ID:", req.params.id)
    console.log("Update data:", updateData);;
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.error("Erreur lors de la mise à jour du produit:", err);
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error deleting product:", err);
  }
};

module.exports = {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
