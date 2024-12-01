import productModel from "../models/productModel.js";
import path from 'path';

const addProduct = async (req, res) => {
    try {
      console.log('Form Data:', req.body);
      console.log('Uploaded File:', req.file);
  
      const { brand, category, productName, productPrice, productDesc } = req.body;
      const filePath = req.file ? req.file.path.replace(/\\/g, '/') : null;
  
      const productInstance = new productModel({
        brandId: brand,
        categoryId: category,
        productName,
        productPrice,
        productDesc,
        productImg: filePath,
      });
  
      const savedProduct = await productInstance.save();
      console.log("Data Saved to MongoDB");
      res.status(201).json({ msg: "Product added successfully", data: savedProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ msg: "Error adding product", error });
    }
  };

const showProduct = async function(req, res) {
    try{
        var productData = await productModel.find()
        res.status(200).send({msg:'Fetch Product SuccessFully', data:productData}) 
    }
    catch{
        res.status(500).send({msg:'Fetching Error', data:null})
    }
}

const showProductById = async function(req, res) {
    try{
        var productDataById = await productModel.findById()
        res.status(200).send({msg:'Fetch Product SuccessFully', data:productDataById}) 
    }
    catch{
        res.status(500).send({msg:'Fetching Error', data:null})
    }
}

export {
    addProduct,
    showProduct,
    showProductById
}