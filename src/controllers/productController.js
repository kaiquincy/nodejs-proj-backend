const Product = require('../models/product');

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error });
    }
};

// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error });
    }
};

// Thêm sản phẩm mới
exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, image, reviews, rating } = req.body;

        // Kiểm tra thông tin đầu vào
        if (!title || !description || !price || !image || !reviews || !rating) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin sản phẩm' });
        }

        // Tạo sản phẩm mới
        const newProduct = new Product({
            title,
            description,
            price,
            image,
            reviews,
            rating
        });

        await newProduct.save();
        res.status(201).json({ message: 'Thêm sản phẩm thành công', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm sản phẩm', error });
    }
};
