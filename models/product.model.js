const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
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

