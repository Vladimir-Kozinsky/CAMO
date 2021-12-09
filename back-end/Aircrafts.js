const mongoose = require('mongoose')

const Aircraft = new mongoose.Schema({
    msn: { type: Number, required: true },
    reg: { type: String, required: true },
    type: { type: String, required: true },
    FH: { type: String, required: true },
    FC: { type: Number, required: true },
    legs: [{
        depDate: { type: String, required: true },
        flightNumber: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        blockOFF: {
            date: { type: String, required: true },
            time: { type: String, required: true },
        },
        takeOFF: {
            date: { type: String, required: true },
            time: { type: String, required: true },
        },
        land: {
            date: { type: String, required: true },
            time: { type: String, required: true },
        },
        blockON: {
            date: { type: String, required: true },
            time: { type: String, required: true },
        },
        totalFH: { type: String, required: true },
        totalFC: { type: String, required: true },
    }
    ]
})

module.exports = mongoose.model('Aircraft', Aircraft)