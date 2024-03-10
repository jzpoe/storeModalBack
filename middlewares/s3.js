const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");


const  AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY =  process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

const s3Client = new S3Client({ region: AWS_BUCKET_REGION });


const uploadToS3 = async () => {
    const command = new PutObjectCommand({
      Bucket: "nombre-de-tu-bucket",
      Key: "nombre-del-archivo",
      Body: "contenido-del-archivo",
    });
  
    try {
      const response = await s3Client.send(command);
      console.log("Archivo subido exitosamente:", response);
    } catch (err) {
      console.error("Error al subir el archivo:", err);
    }
  };
  
  uploadToS3();

// const client = new S3Client({
//     region: AWS_BUCKET_REGION,
//   credentials: {
//     accessKeyId: AWS_PUBLIC_KEY,
//     secretAccessKey: AWS_SECRET_KEY,
//   }
//  });

 
module.exports = uploadToS3