const { imageUploadUtil } = require("../../helpers/cloudinary");




const handleImageUpload = async(req,res)=> {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data" + req.file.mimetype + ";based64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success : true,
            result,
        });
    } catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "error occured",
        });
      } 
};


// add a new products
const addProduct =  async(req,res)=> {
    try{

    }catch(e){
        console.log(e)
        res.json({
            success : false,
            message : 'Error occured!!!',
        });
    }
}


// fetch all products

const fetchAllProduct =  async(req,res)=>{
    try{

    }catch(e){
        console.log(e)
        res.json({
            success : false,
            message : 'Error occured!!!',
        });
    }
}


// edit a product

const editProduct =  async(req,res)=>{
    try{

    }catch(e){
        console.log(e)
        res.json({
            success : false,
            message : 'Error occured!!!',
        });
    }
}


// delete a product

const deleteProduct =  async(req,res)=>{
    try{

    }catch(e){
        console.log(e)
        res.json({
            success : false,
            message : 'Error occured!!!',
        });
    }
}


module.exports = {handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct};