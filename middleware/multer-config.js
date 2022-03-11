const multer = require('multer');
var path = require('path')

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'files');
  },
  filename: (req, file, callback) => {
  
    callback(null, Date.now() + path.extname(file.originalname));
  }
});

module.exports = multer({storage: storage}).single('image');