const express = require('express');
const cors = require('cors');
const multer = require('multer')
require('dotenv').config()

const app = express();

const upload = multer({dest: 'uploads/'})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  
  const file = req.file;

  if (!file) {
    throw new Error('No file uploaded');
  }
  
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
})


// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error('Error: ', err.stack);
  res.status(500).json({error: err.message});
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
