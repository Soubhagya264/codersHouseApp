const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const { response } = require("express");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require('../dtos/user-dto');
class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ messages: 'phone field is required.' });
        }
        const otp = await otpService.generateOtp();
        const ttl = 1000 * 60 * 2;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        try {
            // await otpService.sendBySms(phone,otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone: phone,
                otp: otp,
            });
        }
        catch (err) {
            console.log(err);
        }

    }

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        
        if (!otp || !hash || !phone) {
            res.status(400).json({ messages: "All fields are required" });
        }
        const [hashedOtp, expires] = hash.split(".");
        if (Date.now() > +expires) {
            res.status(400).json({ messages: "OTP expired" });
        }

        const data = `${phone}.${otp}.${expires}`;
        
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            res.status(400).json({ message: "Invalid OTP" });
        }
        let user;
        //  let accessToken;
        //  let refToken;
        try {
            user = await userService.findUser({ phone: phone });
            if (!user) {
                user = await userService.createUser({ phone: phone, });
            }
        }
        catch (err) {
            
            res.status(500).json({ messages: "DB Error: " + err.message });
        }
        // Token 

        const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id, activated: false });
        await tokenService.storeRefreshToken(refreshToken, user._id);

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httponly: true
        })

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httponly: true
        })
        const userDto = new UserDto(user);
        res.json({ "user": userDto, auth: true });








    }
    async refresh(req, res) {
        // get refresh token from cookie
        // check if token is valid
        // check if token is in database
        //generate new token (refresh , access token)
        // put in cokkie
        let userData;
        const { refreshToken: refTokenFromCookie } = req.cookies;
        
        try {
            userData = tokenService.verifyRefreshToken(refTokenFromCookie);
        }

        catch (e) {
            res.status(401).json({ message: "Invalid refresh token." });
            console.log("Invalid refresh token.");
        }

        try {
            const token = await tokenService.findRefreshToken(
                userData._id,
                refTokenFromCookie
            );
           
            if (!token) {
                return res.status(401).json({ message: "Invalid refresh token." });
            }
        } catch (e) {
            return res.status(500).json({ message: "Internal Error ." });
        }

        const user = userService.findUser({
            _id: userData._id
        });

        if (!user) {
            res.status(404).json({ message: "User not found." });
        }
        const{refreshToken,accessToken}= tokenService.generateToken({_id:userData._id});

        // update refresh token
        try{
            await tokenService.updateRefreshToken(userData._id,refreshToken);
        }
        catch (e){
            res.status(500).json({ message: "Internal Error." });
        }
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httponly: true
        })

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httponly: true
        })
        const userDto = new UserDto(user);
        res.json({ "user": userDto, auth: true });

    }

    async logout(req, res){
        const {refreshToken}=req.cookies;
        await tokenService.removeToken(refreshToken)
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({user:null, auth:false});
    }

}
module.exports = new AuthController();