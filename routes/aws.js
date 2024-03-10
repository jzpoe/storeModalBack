require('dotenv').config({ path: '../.env' });
const express = require("express");
const router = express.Router();
const {S3Client, DeleteObjectCommand, PutObjectCommand} = require('@aws-sdk/client-s3') //require('aws-sdk')
const multerS3 = require('multer-s3');
const multer = require('multer')

const sharp = require('sharp');

// configurar S3

const miRegion = "us-east-2";


let s3 =new S3Client({
  region: miRegion,
  credentials:{
    accessKeyId:    AWS_PUBLIC_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
}})
    


// Ruta para subir la imagen a S3
router.post("/upload", async (req, res) => {
  
     let bucket = 'mdstore2'
     let carpetaBucket= 'imagenes'
     let urlImagen = 'https://' + bucket + '.s3.' + miRegion + '.amazonaws.com' + carpetaBucket //ruta donde se va a guardar la imagen

//multer

const upload = multer({
  storage: multerS3({
    s3: s3, // Tu cliente S3 previamente configurado
    bucket: 'mdtore', // Nombre de tu bucket en S3
    acl: 'public-read', // Configura los permisos de acceso
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, 'imagenesFront/' + Date.now().toString() + '-' + file.originalname); // Definir la clave (key) del objeto en S3
    }
  })
});


//funcion de subida de s3

upload.single('file')(req, res, async(err)=>{
  if(err){
    console.log('error desde upload: ', err)
  } else{
      const redimensionBuffer = await sharp(req.file.buffer)
    .resize({width:600, height:600, fit: 'cover'})
    .toBuffer()

    const params = {
      bucket: bucket,
      key:carpetaBucket,
      Body: redimensionBuffer,
      ContentType: 'image/jpeg'
    }

    //subir la imagen 

    const command = new PutObjectCommand(params)//sube la imagen 
    await s3.send(command)
    .then(response => {
      return res.status(200).json({urlImagen: urlImagen, message:'archivo subido correctamente'});
    })
    .catch(err => {
    console.log('error al ejejutar send',err);
    return res.status(500).json({message:'error, por favor volver a intentarlo'})
    })
  }
});

})

module.exports = router;
