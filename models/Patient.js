const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PatientSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    patientName:{
        type: String,
        required: true
    }
});

module.exports = Patient = mongoose.model('patient', PatientSchema);