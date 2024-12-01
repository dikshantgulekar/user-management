import jwt from 'jsonwebtoken'

var secretKeyForToken = 'as6d78a6sd7a6d8as6d78a678sd'

var expireTime = 3600;

function createToken(dataForToken){
    var tokengenerated = jwt.sign(dataForToken, secretKeyForToken, {expiresIn : expireTime})
    
    return tokengenerated;
}

export default createToken;