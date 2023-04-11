const fs = require('fs');
const path = require('path');
const multer = require("multer");


// Check for folder upload
const storageFolderPath = "uploads/";
if (!fs.existsSync(storageFolderPath)) {
  fs.mkdirSync(storageFolderPath, { recursive: true })
}
// Assign filename before saving into uploads folder
const storage = multer.diskStorage({
  destination: (req, res, callback)  =>{
    callback(null, storageFolderPath);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})
// Limit file size
const MAX_FILE_SIZE = 1024 * 1024 * 20; // 10 MB to Bytes

const UPLOAD_FIELDNAME = "upfile";

const upload = multer( { storage: storage, limits: {fileSize: MAX_FILE_SIZE} } ); // upload folder destination

const uploadFileAndAnalyze = (req, res) => {
    new Promise((resolve, reject) => {
      upload.single(UPLOAD_FIELDNAME)(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    })
    .then(() => {
      if (!req.file) {
        return res.status(400).json({ error: "No file specified" });
      }
      
      const { originalname: name, mimetype: type, size } = req.file;
      res.json({ name, type, size });
    })
    .catch((err) => {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({ error: `File size should not exceed ${MAX_FILE_SIZE} bytes` });
      }
      else {
        res.status(400).json({ error: `${err}` });
      }
    });
}


exports.uploadFileAndAnalyze = uploadFileAndAnalyze;