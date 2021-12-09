const Router = require('express')
const Aircraft = require("./Aircrafts")
const cors = require('cors')

const router = new Router()

router.use(cors({
    origin: 'http://localhost:3000'
}))

// ADD AIRCRAFT
router.post('/add', async (req, res) => {
    try {
        const { msn, reg, type, FH, FC, legs } = req.body
        const aircraft = await Aircraft.create({ msn, reg, type, FH, FC, legs })
        res.json(aircraft)
    } catch (error) {
        res.status(500).json(error)
    }
})

// ADD LEG
router.post('/legs/add', async (req, res) => {
    try {
        const { msn, leg } = req.body
        const air = await Aircraft.findOne({ msn: msn }).exec();

        await Aircraft.updateOne(
            air,
            { $push: { legs: leg } },
        );

        await Aircraft.updateOne({
            msn: msn
        }, { FH: leg.totalFH, FC: leg.totalFC }, { upsert: true });


        res.json({
            resultCode: 1,
            message: "Leg succesfully added"
        })
    } catch (error) {
        res.status(500).json({
            resultCode: 0,
            message: error
        })
    }
})

// GET AIRCRAFT INFO
router.get('/info', async (req, res) => {
    try {
        const { msn } = req.query
        const aircraft = await Aircraft.findOne({ msn: msn }).exec();
        res.json({
            msn: aircraft.msn,
            reg: aircraft.reg,
            type: aircraft.type,
            FH: aircraft.FH,
            FC: aircraft.FC
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET AIRCRAFT LEGS
router.get('/legs', async (req, res) => {
    try {
        const { msn } = req.query
        const aircraft = await Aircraft.findOne({ msn: msn }).exec();
        res.json(aircraft.legs)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET AIRCRAFTS LIST
router.get('/aircrafts', async (req, res) => {
    try {
        let arr = []
        const aircrafts = await Aircraft.find()
        for (let i = 0; i < aircrafts.length; i++) {
            const element = aircrafts[i];
            arr.push(element.msn)
        }
        res.json(arr)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router