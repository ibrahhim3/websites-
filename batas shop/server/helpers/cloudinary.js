const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'deqdggxcd',
    api_key: '219237363976121',
    api_secret: 'kYvevGh_-UnEw4WXJpZlKqPHeqk',
});


const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto',
    });
    return result;
}






const upload = multer({storage});

module.exports = {upload, imageUploadUtil};