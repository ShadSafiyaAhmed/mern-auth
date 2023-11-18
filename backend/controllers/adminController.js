import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js'
import generateTokenAdmin from '../utils/generateTokenAdmin.js'
import {
    fetchAllUsers,
    updateUser,
    deleteUser
} from '../Helpers/adminHelpers.js'

const authAdmin = asyncHandler(async(req,res) => {
    const {email, password} =  req.body;

    const admin = await Admin.findOne({email})

    if(admin && (await admin.matchPassword(password))) {
        generateTokenAdmin(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid email or password')
    }
})

const registerAdmin = asyncHandler(async(req,res) => {
    const {name, email, password, key} = req.body
    
    const adminExist = await Admin.findOne({email})

    if(adminExist) {
        res.status(400) 
        throw new Error('Admin already exist')
    }
    console.log(key, 'this is key')

    if(key!== process.env.ADMIN_KEY){
        res.status(401)
        throw new Error('Invalid Key')
    }

    const admin = await Admin.create({
        name,
        email,
        password
    })

    if(admin) {
        generateTokenAdmin(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            name:admin.name,
            email: admin.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid admin data')
    }
})


const logoutAdmin = asyncHandler(async(req,res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message:'Logged Out'})
})


const getAdminProfile = asyncHandler(async(req,re) => {

    const admin = {
        id : req.admin._id,
        name: req.admin.name,
        email: req.admin.email
    }
})


const updateAdminProfile = asyncHandler(async(req,res) => {
    const admin = await Admin.findById(req.admin._id)

    if(admin) {
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;

        if(req.body.password) {
            admin.password = req.body.password
        }

        const updatedAdmin = await admin.save()

        res.status(200).json({
            _id: updatedAdmin._id,
            name: updatedAdmin.name,
            email: updatedAdmin.email
        })
    }else{
        res.status(404) 
        throw new Error('Admin not found')
    }
})


const getAllUsers = asyncHandler(async(req,res) => {
    fetchAllUsers()
    .then((users) =>{
        res.status(200).json({users})
    })
    .catch((error) => {
        console.log(error)
    })
})


const updateUserData = asyncHandler(async(req,res) => {
    const {userId, name , email} = req.body

    if(!userId) {
        res.status(404) 
        throw new Error('User id not recieved in request. user update failed')
    }

    const userData = {userId: userId, name: name, email: email}

    const usersUpdateStatus = await updateUser(userData)

    if(usersUpdateStatus.success) {
        const response = usersUpdateStatus.message;
        res.status(200).json({ message: response })
    }else{
        res.status(404)
        throw new Error('User update failed')
    }
})

const deleteUserData = asyncHandler( async (req, res) => {

    const userId = req.body.userId;
    console.log('helkklklodf',userId);
    const usersDeleteStatus = await deleteUser(userId);
    console.log(usersDeleteStatus);
    if(usersDeleteStatus.success){
        const response = usersDeleteStatus.message;
        res.status(200).json({ message:response });
    }else{
        res.status(404);
        const response = usersDeleteStatus.message;
        throw new Error(response);

    }

});


export {
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllUsers,
    updateUserData,
    deleteUserData
}