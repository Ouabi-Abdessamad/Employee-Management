const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminName:{
        type: String,
        required: [true, 'Please add the admin name']
    },
    adminEmail:{
        type: String,
        required: [true, 'Please add the admin email address'],
        unique: [true, 'Email adress already taken']
    },
    adminPassword:{
        type: String,
        required: [true, 'Please add the admin password']
    }
}, 
{
    timestamps:true
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;