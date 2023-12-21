const Product = require('../models/product.model')

// Get all products

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {

        res.status(500).json({ error: err.message })
        console.log('ERROR_Find-Product', err);
    }
};

// Add a new product

const addNewProduct = async (req, res) => {

    const {title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, createdAt, updatedAt} = req.body;

    const newProduct = new Product({title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, createdAt, updatedAt});

    try {
        await newProduct.save();
        console.log('produit enregistré', newProduct)
        res.redirect('/products')
    } catch (err) {

        res.status(400).json({ error: err.message })
        console.error('Erreur lors de l\'enregistrement du produit:', err);
    }
};


// Update a product
const updateProduct = async (req, res) => {
    const {title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, createdAt, updatedAt} = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, createdAt, updatedAt}, {new: true});
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.error('Erreur lors de la mise à jour du produit:', err);
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.json({ message: 'Produit supprimé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error('Erreur lors de la suppression du produit:', err);
    }
};

module.exports = {
    getAllProducts,
    addNewProduct,
    updateProduct,
    deleteProduct
};