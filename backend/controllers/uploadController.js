const fs = require("fs");

const uploadController = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const content = fs.readFileSync(req.file.path, "utf8");

  global.lastUploadedFile = {
    filename: req.file.originalname,
    content: content,
  };

  res.json({
    message: "Program Uploaded Successfully",
    filename: req.file.originalname,
  });
};

module.exports = uploadController;