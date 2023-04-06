const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const multer = require("multer");


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

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

const upload = multer( { storage: storage, limits: {fileSize: MAX_FILE_SIZE} } ); // upload folder destination


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", (req, res, next) => {
  new Promise((resolve, reject) => {
    upload.single("upfile")(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  })
  .then(() => {
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
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
