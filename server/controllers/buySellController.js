const Product = require('../models/SellProduct');

const createProduct = async (req, res) => {
    try {
        const { title, description, price, image, category, condition } = req.body;

        const product = new Product({
            title,
            description,
            price,
            image,
            category,
            condition,
            seller: req.user._id, 
        });

        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isSold: false }).populate('seller', 'username email');
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'username email');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { title, description, price, image, category, condition } = req.body;

        // Make sure you don't update sold products
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.isSold) {
            return res.status(400).json({ message: 'Cannot update sold product' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { title, description, price, image, category, condition },
            { new: true }
        );

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const markProductAsSold = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.isSold) {
            return res.status(400).json({ message: 'Product already sold' });
        }

        product.isSold = true;
        product.soldDate = Date.now();
        product.buyer = req.user._id;

        await product.save();

        res.status(200).json({ message: 'Product marked as sold', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.isSold) {
            return res.status(400).json({ message: 'Cannot delete sold product' });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    markProductAsSold,
    deleteProduct,
};
