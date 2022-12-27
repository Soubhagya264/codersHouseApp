const tokenService= require('../services/token-service');
module.exports = async function (req, res, next) {
    try {
        const {accessToken}=req.cookies;
        if (!accessToken) {
            console.log('No access token');    
            throw new Error();
        }
        const userData=await tokenService.verifyAccessToken(accessToken);
        if (!userData) {
            console.log('No user data');
            throw new Error();
        }
        req.user=userData;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({message:"Invalid token"});

    }

}