const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminModal');
const jwt = require('jsonwebtoken');

const registerAdmin = asyncHandler(async (req, res)=>{
    let {adminName, adminEmail, adminPassword} = req.body;
    if(!adminName || !adminEmail || !adminPassword){
        res.status(400);
        throw new Error(`All fields are requested!`);
    }
    const adminAvailable = await Admin.findOne({adminEmail});
    if(adminAvailable){
        res.status(400);
        throw new Error(`Admin Already registered !`);
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await Admin.create({
        adminName,
        adminEmail,
        adminPassword:hashedPassword
    })
    if(admin){
        res.status(201).json({_id:admin._id, email:admin.adminEmail});
    }else{
        res.status(400);
        throw new Error(`Admin data is not valid!`);
    }
});

const loginAdmin = asyncHandler(async (req, res)=>{
    const { adminEmail,adminPassword} = req.body;
    if(!adminEmail || !adminPassword){
        res.status(400);
        throw new Error(`All fields are requested!`);
    }
    const admin = await Admin.findOne({adminEmail});
    if(admin && (await bcrypt.compare(adminPassword, admin.adminPassword))){
        const payload = {
            admin:{
                name:admin.adminName,
                email:admin.adminEmail, 
                id:admin._id
            }
        }
        const secretKey = process.env.SECRET_KEY;
        const expiry = {expiresIn:"1h"}
        const token = jwt.sign(payload, secretKey, expiry);
        res.status(200).json(token);
    } else{
        res.status(401);
        throw new Error(`email or password is not valid!`);
    }
    
});

const currentAdmin = asyncHandler(async (req, res)=>{
    res.status(200).json(req.admin);
});

module.exports = {registerAdmin, loginAdmin, currentAdmin}
