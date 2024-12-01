import bcrypt from 'bcrypt'

const saltRounds = 10;

function encryptData(txtdata){
    if (!txtdata) {
        throw new Error("Text data is required for encryption.");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(txtdata, salt)
    return hash;
}

function checkEncryptData(txtdata, hashkey){
    if (!txtdata || !hashkey) {
        throw new Error("text data and hash key are required");
    }
    return bcrypt.compareSync(txtdata, hashkey)
}

export {
    encryptData,
    checkEncryptData
}