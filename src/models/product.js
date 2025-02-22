const mongoose = require('mongoose');

// Tạo schema counters để lưu giá trị tự tăng
const counterSchema = new mongoose.Schema({
    _id: { type: String },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Tạo schema Product
const ProductSchema = new mongoose.Schema({
    _id: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    reviews: { type: String, required: true },
    rating: { type: String, required: true }
});

// Hàm để lấy giá trị tự tăng
ProductSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { _id: 'productId' }, 
            { $inc: { seq: 1 } }, 
            { new: true, upsert: true }
        );
        this._id = counter.seq;
    }
    next();
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
