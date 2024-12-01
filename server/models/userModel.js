import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, match: /^[0-9]{10}$/ },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
    userstatus: { type: Number, default: 1 },
});

const userModel = mongoose.model("register", userSchema);

export default userModel;
