
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
});
const imagenesStore = mongoose.model('File', fileSchema);

module.exports = imagenesStore;