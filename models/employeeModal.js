const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Admin"
    },
    fName:{
        type: String,
        required: [true, 'Please add your first name']
    },
    lName:{
        type: String,
        required: [true, 'Please add your last name']
    },
    address:{
        type: String,
        required: [true, 'Please add your address']
    },
    email:{
        type: String,
        required: [true, 'Please add your email']
    },
    phone:{
        type: String,
        required: [true, 'Please add your phone number']
    }
}, 
{
    timestamps:true
});
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

