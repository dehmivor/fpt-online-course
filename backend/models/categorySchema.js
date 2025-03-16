const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Schema cho Category
const categorySchema = new Schema({
  label: { type: String, required: true },
  img: { type: String, required: true },
});

// Mongoose models
const Category = mongoose.model("Category", categorySchema);

// Exporting models
module.exports = {
  Category,
};
