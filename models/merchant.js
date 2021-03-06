const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [15, "Password must contain at least 15 characters"]
    },
    pos: {
        type: String,
        required: true
    },
    posId: String,
    lastUpdatedTime: {
        type: String,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    inventory: [{
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ingredient",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [0, "Quantity cannot be less than 0"]
        }
    }],
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }]
});

module.exports = mongoose.model("Merchant", MerchantSchema);