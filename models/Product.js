const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // si on met pas cette ligne, l'id va être créé par la bdd automatiquement; mais c'est une bonne pratique de le faire ici.
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    createdAt: Date,
    updatedAt: Date,
}); // schema less
const Product = mongoose.model('Product', schema);

module.exports = Product

