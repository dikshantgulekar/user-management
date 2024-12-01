import categoryModel from "../models/categoryModel.js";


const addCategory = async(req, res)=>{
    try{
        var categoryInstance = new categoryModel(req.body)
        var result = await categoryInstance.save();
        res.status(200).send({msg:"Category Added Successfully"}) 
    }
    catch(error){
        res.status(500).send({ err: err.message });
        console.log(err, "error"); 
    }
}

const showcategory = async(req,res)=>{
    try{
        var categoryData = await categoryModel.find()
        res.status(500).send({msg:"Fetch Category Data", data : categoryData})
    }
    catch(error){
        res.status(500).send({ err: err.message });
        console.log(err, "error"); 
    }
}

export {
    addCategory,
    showcategory
}