import { encryptData } from "../middlewares/encryptdecrypt.js"
import userModel from "../models/userModel.js"


const addUser = async function (req, res) {
    try {
        console.log(req.body);

        const { userName, userEmail, userMobile, userPassword, userCpassword } = req.body;

        // Check if email already exists
        const existingUser = await userModel.findOne({ email: userEmail });
        if (existingUser) {
            return res.status(200).send({ msg: "Email Id Exists", status: false });
        }

        // Encrypt passwords
        const encryptedPassword = encryptData(userPassword);
        const encryptedCpassword = encryptData(userCpassword);

        // Save user to the database
        const userInstance = new userModel({
            name: userName,
            email: userEmail,
            mobile: userMobile,
            password: encryptedPassword,
            cpassword: encryptedCpassword,
        });

        const result = await userInstance.save();
        res.status(201).send({ msg: "User Added", data: result, status: true });
    } catch (err) {
        console.error("Error in addUser:", err.message);
        res.status(500).send({ err: err.message });
    }
};

const showUser = async function(req, res) {
    try{
        var userData = await userModel.find();
        res.status(200).send({msg:'Fetch UserData SuccessFully', data : userData})
    }
    catch(err){
        res.status(500).send({ err: err.message });
        console.log(err, "error");
    }
}

const showUserById = async function(req, res) {
    try{
        var userDataById = await userModel.findById(req.params.userid);
        res.status(200).send({msg:'Fetch UserData SuccessFully', data : userDataById})
    }
    catch(err){
        res.status(500).send({ err: err.message });
        console.log(err, "error");
    }
}

const updateUserById = async function(req, res) {
    console.log(req.params.userid, req.body)
    try{
        var result = await userModel.findByIdAndUpdate(req.params.userid, req.body)
        res.status(200).send({msg:"User Updated", data:null})
    }
    catch(err){
        res.status(500).send({ err: err.message });
        console.log(err, "error");
    }
}

const deleteUserById = async function(req, res) {
    try{
        var result = await userModel.findByIdAndDelete(req.params.userid)
        res.status(200).send({msg:"User Deleted", data:null, status:true})
    }
    catch(error){
        console.log(error.message);
        res.status(403).send({data:null , message:'No Document Found'});
    }
}

const updateUserStatus = async function(req, res) {
    const { userid } = req.params; 
    const { userstatus } = req.body;
  
    try {

        const result = await userModel.findByIdAndUpdate(userid, { userstatus }, { new: true });

        if (!result) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        res.status(200).json({ status: true, message: "User status updated successfully", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Error updating user status" });
    }
};


export {
    addUser,
    showUser,
    showUserById,
    updateUserById,
    deleteUserById,
    updateUserStatus
}