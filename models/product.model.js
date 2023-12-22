const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // si je ne mets pas cette ligne, l'id va être créé par la bdd automatiquement; mais c'est une bonne pratique de le faire ici.
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
    updatedAt: Date},
    {
        timestamps: true,
      }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product

