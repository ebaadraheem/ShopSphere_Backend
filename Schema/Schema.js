import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    detail: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    favourite: { type: Boolean, default: false },
    Incart: { type: Boolean, default: false },
    total: { type: Number, default: 1 },
    img: { type: String, required: true },
    sizes: { type: [Object], required: true }
});

const Cards = mongoose.model('Cards', cardSchema);

export default Cards;
