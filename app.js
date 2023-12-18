// const _ = require('lodash'); // _ c'est lodash

// function getRandomInteger(){
//     return Math.round(Math.random()*100); // 0-99
// }

// var result = _.times(3, getRandomInteger)

// console.log(result);

const express = require('express')
const app = express() // objet app ==> methods
const logger = require('./logger')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const productRouter = require('./routes/product')
const mongoose = require('mongoose')

const Product = require('./models/Product')

// db

mongoose.connect(`mongodb://0.0.0.0:27017/projet` )
    .then(()=>{console.log('database connected')})
    .catch(err=>{console.log('error connecting to', err)})

// model



// console.log(__dirname);
// console.log(path.join(__dirname, 'views', 'home.html'));
// 

// routes
// app.get('/', (req, res)=>{
//     // console.log(req.url); // /
//     // console.log(req.method); // GET
//     res.end('<h1>Welcome from express js</h1>')
// })

// middlewares
// app.use(logger)
// app.use(morgan('dev')) // donne plus de choses et plus propre que logger(infos sur la meme ligne); est appelé de la même manière que Morgan et fait à peu près la meme chose. On est obligé de lui écrire des insctructions, alors que morgan est écrit deja

// app.use('/', (req, res, next)=>{
//     res.send('Welcome')
//     res.end()
// })

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')
// app.set('views', 'test')


// routes
// app.get('/', (req, res, next)=>{
//     // res.sendFile(path.join(__dirname, 'views', 'home.html'))
//     let products = ["vin", "coffee", "tea"]
//     res.render('home', {
//         title: "Bonjour depuis ejs",
//         products
//     })
// })

// app.get('/about', (req, res, next)=>{
//     res.sendFile(path.join(__dirname, 'views', 'about.html'))
// })

// routes
app.use(productRouter);
// app.get('/test', async(req, res)=>{
//     try{
//         const products = await Product.find()
//         console.log(products);
//         res.send(products)
//     } catch(error) {
//         console.log(error);
//     }
// })

// app.use((req, res, next)=>{
//     console.log('première requete')
//     // console.log('host :' , req.hostname)
//     // console.log('host :' , req.path)
//     // console.log('host :' , req.method)
//     next()
// })
// app.use((req, res, next)=>{
//     console.log('deuxième requete')

//     next()

// })
app.use((req, res)=>{
    console.log('00');
    res.end('404')
})

app.listen(3000)