import brandModel from "../models/brandmodel.js"


const addBrand = async(req, res)=>{
    try{
        var addInstance = new brandModel(req.body)
        var result = await addInstance.save();
        res.status(200).send({msg:"Brand Added Successfully"}) 
    }
    catch(error){
        res.status(500).send({ err: err.message });
        console.log(err, "error"); 
    }
}

const showBrand = async(req,res)=>{
    try{
        var brandData = await brandModel.find()
        res.status(500).send({msg:"Fetch Brand Data", data : brandData})
    }
    catch(error){
        res.status(500).send({ err: err.message });
        console.log(err, "error"); 
    }
}

export {
    addBrand,
    showBrand
}