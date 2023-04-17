const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModal');


const getEmployee = asyncHandler(async (req, res)=>{
    const employees = await Employee.find({adminId:req.admin.id});
    res.status(200).json(employees);
});
const getEmployeeById = asyncHandler(async (req, res)=>{
    try{
        const employee = await Employee.findById(req.params.id);
        if(employee.adminId.toString() !== req.admin.id){
            res.status(403);
            throw new Error(`Admin is not allowed to access these resourses!`);
        }
        res.status(200).json(employee);
    }catch(err){
        res.status(404);
        throw new Error(`Employee Not Found!`);
    }
});
const createEmployee = asyncHandler(async (req, res)=>{
    let {fName, lName, address, email, phone} = req.body;
    
    const employee = await Employee.create({
        adminId:req.admin.id,
        fName, 
        lName,
        address,
        email,
        phone
    });
    res.status(201).json(employee);
});
const updateEmployeeById = asyncHandler(async (req, res, next)=>{
    try{
        const employee = await Employee.findById(req.params.id);
        if(employee.adminId.toString() !== req.admin.id){
            res.status(403);
            throw new Error(`Admin is not allowed to access these resourses!`);
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEmployee);
    }catch(err){
        res.status(404);
        throw new Error(`Employee Not Found!`);
    }
   
});
const deleteById = asyncHandler(async (req, res)=>{
    const employee = await Employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error(`Employee Not Found!`);
    }
    if(employee.adminId.toString() !== req.admin.id){
        res.status(403);
        throw new Error(`Admin is not allowed to access these resourses!`);
    }
    await Employee.deleteOne({_id:req.params.id});
    res.status(200).json(employee);
});
module.exports = {
    getEmployee, 
    getEmployeeById,
    createEmployee,
    updateEmployeeById,
    deleteById
}