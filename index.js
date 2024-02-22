"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
var multer = require("multer");
var handleError = function (err, res) {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};
var upload = multer({
    dest: "/images"
});
app.post("/upload", upload.single("file" /* name attribute of <file> element in your form */), function (req, res) {
    var tempPath = req.file.path;
    var targetPath = path.join(__dirname, "./uploads/image.png");
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, function (err) {
            if (err)
                return handleError(err, res);
            res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
        });
    }
    else {
        fs.unlink(tempPath, function (err) {
            if (err)
                return handleError(err, res);
            res
                .status(403)
                .contentType("text/plain")
                .end("Only .png files are allowed!");
        });
    }
}, app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
}));
