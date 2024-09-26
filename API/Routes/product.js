import express from 'express'
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../Controllers/product.js'

const router = express.Router()

//add product
router.post('/add', addProduct)

//get all product
router.get('/all', getProducts)

//get products by id
router.get('/:id', getProductById)

//update product by id
router.put('/:id', updateProductById)

//delete product by id
router.delete('/:id', deleteProductById)

export default router

