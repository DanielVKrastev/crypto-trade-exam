import { Schema, model, Types } from "mongoose";

const cryptoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: [
            'crypto-wallet',
            'credit-card',
            'debit-card',
            'paypal',
        ],
    },
    buyCrypto: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
});

const Crypto = model('Crypto', cryptoSchema);

export default Crypto;