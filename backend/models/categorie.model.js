const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorieSchema = new Schema({
  id: { type: Number, required: true },
  label: { type: String, required: true },
  img: { type: String, required: true },
});

const Categorie = mongoose.model("Categorie", categorieSchema);
module.exports = Categorie;
