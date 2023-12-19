const express = require('express')
const app = express() // objet app ==> methods
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const productRouter = require('./routes/product')
const mongoose = require('mongoose')
const cors = require('cors')

const Product = require('./models/Product')

// db connection
mongoose.connect(`mongodb://0.0.0.0:27017/projet` )
    .then(()=>{console.log('database connected')})
    .catch(err=>{console.log('error connecting to', err)})

// middlewares
// app.use(morgan('dev')) // donne plus de choses et plus propre que logger(infos sur la meme ligne);
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

// routes
app.use(productRouter);
app.use((req, res)=>{
    res.end('404')
})

app.listen(4000)