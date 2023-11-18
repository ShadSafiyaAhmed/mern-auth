import jwt from "jsonwebtoken";

const generateTokenAdmin = (res, adminId) => {
    const token = jwt.sign ({adminId}, process.env.JWT_SECRET, 
        {expiresIn: '30d'})

    res.cookie('adminJwt', token, {
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        samSite: 'strict',
        maxAge : 30 * 24 * 60 * 60 * 1000
    })
}

export default generateTokenAdmin