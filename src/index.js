'use strict'

import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

//SERVICES
import ProductService from './services/product.service'

//Configuracion CORS
/*var whitelist = ['https://www.google.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}*/

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors()) // Como paramaetro de cors deben ir las configuraciones.


// API PRODUCTS
app.get('/api/products', (req, res) => { ProductService.getAll(req, res) })
app.get('/api/products/:id', (req, res) => { ProductService.findById(req, res) })
app.post('/api/products', (req, res) => { ProductService.create(req, res) })
app.put('/api/products/:id', (req, res) => { ProductService.update(req, res) })
app.delete('/api/products/:id', (req, res) => { ProductService.delete(req, res) })

//CONNECTION TO DATABASE
mongoose.connect(
    'mongodb://localhost:27017',
    {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: 'root',
        pass: 'example',
        dbName: 'shop'
    },
    err => {
        if (err) return console.log(`Error al conectar a la base de datos ${err}`)
        console.log('Conexión a la base de datos establecida')
        app.listen(port, () => {console.log(`API REST running in http://localhost:${port}`)})
    }
)

