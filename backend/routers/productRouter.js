import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from './../model/productModel.js';
import { isAuth } from '../utility/authUtils.js';

const productRouter = express.Router();
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find();
    res.send(products);
}));

productRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        brand: req.body.brand,
        quantity: req.body.quantity,
        price: req.body.price
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
}));

productRouter.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.description = req.body.description;
        product.brand = req.body.brand;
        product.image = req.body.image;
        product.quantity = req.body.quantity;
        product.price = req.body.price;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

productRouter.delete('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));
export default productRouter;