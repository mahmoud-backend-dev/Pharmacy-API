const mongoose = require('mongoose');

const prodectSchame = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    add_pic: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false,
    },
    drug_name: {
        type: String,
        required: [true, 'Please provide drug name'],
    },
    expiry_date: {
        type: String,
        required: [true, 'Please provide expiry date'],
    },
    price: {
        type: String,
        required: [true, 'Please provide price '],
    },
    town: {
        type: String,
        required: [true, 'Please provide town'],
    },
    quantity: {
        type: Number,
        default: 1,
    },
    off: {
        type: String,
        default: "0%",
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', prodectSchame);
