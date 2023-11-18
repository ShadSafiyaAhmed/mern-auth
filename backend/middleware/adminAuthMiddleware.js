import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

const adminProtect = asyncHandler(async(req,res, next) => {
    const tokenFromRequest = req.cookies.adminJwt;
    if(tokenFromRequest) {
        try {
            
            const decodedTokenData = jwt.verify(tokenFromRequest, process.env.JWT_SECRET)
            req.admin = await Admin.findById(decodedTokenData.adminId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
    }else{
            res.status(401);
            throw new Error('Not authorized , no token')
        }
})

export {adminProtect}