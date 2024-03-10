const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../db/model/image_model');

// Configura Multer para manejar la carga de archivos
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para manejar la carga de archivos


router.post('/upload/single', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
    }

    const newFile = new File({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype
    });

    await newFile.save();

    res.json({ filename: req.file.originalname });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).json({ error: 'Error al subir el archivo.' });
  }
});

module.exports = router;
