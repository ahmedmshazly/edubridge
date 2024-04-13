const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const crypto = require('crypto');
const path = require('path');

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // Your MongoDB connection string
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname); // Create a unique filename
        const fileInfo = {
          filename: filename,
          bucketName: 'datasets' // Use 'datasets' as the collection name for storing files
        };
        resolve(fileInfo);
      });
    });
  }
});

module.exports = { storage };
