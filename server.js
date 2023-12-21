const express = require('express')
// const morgan = require('morgan')
// const path = require('path')
// const ejs = require('ejs')
// const productRouter = require('./routes/product')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
// const Product = require('./models/Product')

const app = express() // objet app ==> methods
const port = process.env.PORT || 4000

// db connection
mongoose.connect(`mongodb://0.0.0.0:27017/projet` )
    .then(()=>{console.log('database connected')})
    .catch(err=>{console.log('error connecting to', err)})

// middlewares
// app.use(morgan('dev')) // donne plus de choses et plus propre que logger(infos sur la meme ligne);
// app.use(express.urlencoded({extended:true}))
// app.use(express.static('public'))
// app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
// app.set('view engine', 'ejs')

// routes
app.use(productRouter);

app.get('/', cors(), async (req, res)=>{
    res.send('This is working')
})

app.post("/post_name", async (req, res)=>{
    let {name} = req.body
    console.log(name)
    })

app.get('/myhome', cors(), async (req, res)=>{
    res.send('This is the data for the home page')
})

app.use((req, res)=>{
    res.end('404')
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})