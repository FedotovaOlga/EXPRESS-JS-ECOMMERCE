// const express = require('express')
// const router = express.Router()
// const Product = require('../models/Product') 

// // home page
// router.get('/', async (req,res)=>{
//     try{
//     let products = await Product.find().sort({rating: -1}).limit(3)
//     res.render('home', {
//       title: "Liste des produits les mieux notés",
//       products
//     })
//   }catch(err){
//     console.log('ERROR_Find-Product', err);
//   }
// })

// router.get('/products', async (req, res)=>{
//   // récupérer la liste de produits
//   try{
//     let products = await Product.find()
//     res.render('products', {
//       title: "Liste des produits",
//       products
//     })
//   }catch(err){
//     console.log('ERROR_Find-Product', err);
//   }
// })

// // création de nouveau produit
// router.get('/new-product', (req, res)=>{ // localhost:4000/new-product
//     res.render('new-product', {title:"Nouveau produit", action: "/new-product"})
// })
// router.post('/new-product', async (req, res)=>{
//   try {
//     let newProduct = new Product(req.body);
//     await newProduct.save();
//     console.log('produit enregistré', newProduct)
//     res.redirect('/products')
//   }catch{
//     console.error('Erreur lors de l\'enregistrement du produit:', err);
//   }
// })

// // routes: modifier un produit
// router.get('/edit-product/:id', async (req, res)=>{
// console.log(req.params.id);
// const productId = req.params.id;
// try{
// let product = await Product.findById(productId);
//     res.render('new-product', {
//       p : product,
//       title:"Modifier le produit", 
//       action: `/edit-product`})
//   }catch(err){
//     console.log('Product to modify not found');
//   }
// })
// router.post('/edit-product', async (req, res)=>{
//   let id = req.body.productId
//   console.log(req.body);
//   let {title, price} = req.body
//   let productToModify = {title, price}
//   try {
//     await Product.findOneAndUpdate({_id : id}, productToModify)
//     res.redirect(`/product/${id}`)
//   }catch(err){
//     console.error('Erreur lors de l\'enregistrement du produit:', err)
//   }
// })


// // show product by Id
// router.get('/product/:id', async(req, res)=>{
//     const productId = req.params.id;
//     try{
//       let product = await Product.findById(productId);
//       res.render('show-product', {p : product}) // j'ai fait p : product pour faire un include de la card directement, parce que dans la card c'était p.title etc.
//     }catch(err){
//       console.log('Product not found');
//     }  
// })

// // routes: supprimer un produit
// router.get('/delete-product/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     await Product.deleteOne({_id : productId});
//     res.redirect('/products')
//   } catch (err) {
//     console.log('ERROR_Delete-Product', err);
//   }
// });

// module.exports = router