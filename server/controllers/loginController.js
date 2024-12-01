import { checkEncryptData } from "../middlewares/encryptdecrypt.js";
import createToken from "../middlewares/jwttoken.js";
import userModel from "../models/userModel.js";

const checkUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }); // Use `findOne` for a single match
        if (user) {
            if (checkEncryptData(password, user.password)) {
                const dataForToken = {
                    userStatus: user.userstatus,
                    userEmail: user.email,
                    userPassword : user.password
                };
                const token = createToken(dataForToken);
                return res.status(200).send({ message: 'Auth Done', status: true, tokendata: token, userstatus: user.userstatus });
            } else {
                return res.status(200).send({ message: 'Password Invalid', status: false });
            }
        } else {
            return res.status(200).send({ message: 'Emailid Does not exist', status: false });
        }
    } catch (error) {
        console.error('LOGIN ERROR', error);
        res.status(500).send({ message: 'Internal Server Error', status: false });
    }
};


export default checkUser;