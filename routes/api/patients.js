const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
// Load data model
const User = require('../../models/User');
const Patient = require('../../models/Patient');

// @route GET doctor/<doctorName>/patients
// @desc get list of patients
// @access Private
router.get(
    '/:doctorId/patients',
    passport.authenticate('jwt', {session: false}),
    (req,res) =>{
        Patient.find({user: req.user.id})
            .then(patients =>{
                res.json(patients);
            })
            .catch(err => res.status(404).json({ errors: "no patients"}));
    }
)


// @route POST /doctor/register-patient
// @desc register a patients from a doctor
// @access Private

router.post(
    '/register-patient',
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        const patient = {};
        patient.user = req.user.id;
        patient.patientName = req.body.patientName;

        // Create a patient name
        new Patient(patient).save().then(registeredPatient => res.json(registeredPatient)).catch(err => console.log(err))
    }
)

module.exports = router;