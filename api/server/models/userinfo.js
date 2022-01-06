const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    coworkers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Coworkers'}]
}, {timestamps:true});

module.exports = mongoose.model("UserInfo", UserInfoSchema);