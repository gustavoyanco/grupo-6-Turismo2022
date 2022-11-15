let multerDiscStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join (__dirname, '../public/productsImages');
        callback (null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = path.extname(file.originalname);
        callback (null, imageName);
    },
})