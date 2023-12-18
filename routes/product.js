const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
// const products = [
//     {
//       id: 1000,
//       title: "Produit 1",
//       description: "Description du produit 1",
//       price: 19.99,
//       category: "Électronique",
//       imageUrl: "url_image_produit_1.jpg"
//     },
//     {
//       id: 2,
//       title: "Produit 2",
//       description: "Description du produit 2",
//       price: 29.99,
//       category: "Vêtements",
//       imageUrl: "url_image_produit_2.jpg"
//     },
//     {
//       id: 3,
//       title: "Produit 3",
//       description: "Description du produit 3",
//       price: 39.99,
//       category: "Maison",
//       imageUrl: "url_image_produit_3.jpg"
//     },
//     {
//       id: 4,
//       title: "Produit 4",
//       description: "Description du produit 4",
//       price: 49.99,
//       category: "Sports",
//       imageUrl: "url_image_produit_4.jpg"
//     },
//     {
//       id: 5,
//       title: "Produit 5",
//       description: "Description du produit 5",
//       price: 59.99,
//       category: "Électronique",
//       imageUrl: "url_image_produit_5.jpg"
//     },
//     {
//       id: 6,
//       title: "Produit 6",
//       description: "Description du produit 6",
//       price: 69.99,
//       category: "Vêtements",
//       imageUrl: "url_image_produit_6.jpg"
//     },
//     {
//       id: 7,
//       title: "Produit 7",
//       description: "Description du produit 7",
//       price: 79.99,
//       category: "Maison",
//       imageUrl: "url_image_produit_7.jpg"
//     },
//     {
//       id: 8,
//       title: "Produit 8",
//       description: "Description du produit 8",
//       price: 89.99,
//       category: "Sports",
//       imageUrl: "url_image_produit_8.jpg"
//     },
//     {
//       id: 9,
//       title: "Produit 9",
//       description: "Description du produit 9",
//       price: 99.99,
//       category: "Électronique",
//       imageUrl: "url_image_produit_9.jpg"
//     }
//   ];
  

// home page
router.get('/', async (req,res)=>{
    try{
    let products = await Product.find().sort({rating: -1}).limit(3)
    res.render('home', {
      title: "Liste des produits les mieux notés",
      products
    })
  }catch(err){
    console.log('ERROR_Find-Product', err);
  }
})

router.get('/products', async (req, res)=>{
  // récupérer la liste de produits
  try{
    let products = await Product.find()
    res.render('products', {
      title: "Liste des produits",
      products
    })
  }catch(err){
    console.log('ERROR_Find-Product', err);
  }
})

// création de nouveau produit
router.get('/new-product', (req, res)=>{ // localhost:3000/new-product
    res.render('new-product', {title:"Nouveau produit", action: "/new-product"})
})
router.post('/new-product', async (req, res)=>{
  try {
    let newProduct = new Product(req.body);
    await newProduct.save();
    console.log('produit enregistré', newProduct)
    res.redirect('/products')
  }catch{
    console.error('Erreur lors de l\'enregistrement du produit:', err);
  }
})

// routes: modifier un produit
router.get('/edit-product/:id', async (req, res)=>{
console.log(req.params.id);
const productId = req.params.id;
try{
let product = await Product.findById(productId);
    res.render('new-product', {
      p : product,
      title:"Modifier le produit", 
      action: `/edit-product`})
  }catch(err){
    console.log('Product to modify not found');
  }
})
router.post('/edit-product', async (req, res)=>{
  // console.log("edit product", req.body);
  let id = req.body.productId
  console.log(req.body);
  let {title, price} = req.body
  let productToModify = {title, price}
  try {
    await Product.findOneAndUpdate({_id : id}, productToModify)
    res.redirect(`/product/${id}`)

    // let productToModify = await Product.findById(productId);
    // if (!productToModify) {
    //   console.log('Product to modify not found', err)
    // }
    // productToModify.title = req.body.title;
    // productToModify.price = req.body.price;
    // await productToModify.save();
    // res.redirect('/products')
    // console.log('Produit mis à jour :', productToModify)
  }catch(err){
    console.error('Erreur lors de l\'enregistrement du produit:', err)
  }
})


// show product by Id
router.get('/product/:id', async(req, res)=>{
    // let id = req.params.id
    // let product = products.find(element => element.id == id)
    // console.log('id:', req.params.id);
    const productId = req.params.id;
    try{
      let product = await Product.findById(productId);
      res.render('show-product', {p : product}) // on a fait p : product pour faire un include de la card directement, aprce que dans la card c'était p.title etc.
    }catch(err){
      console.log('Product not found');
    }
    
})

// routes: supprimer un produit
router.get('/delete-product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.deleteOne({_id : productId});
    res.redirect('/products')
   
  } catch (err) {
    console.log('ERROR_Delete-Product', err);
  }
});

module.exports = router