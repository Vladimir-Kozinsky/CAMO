const Router = require('express')
const Aircraft = require("./Aircrafts")
const cors = require('cors')

const router = new Router()

// GLOBAL FUNCTIONS
const minToStr = (time) => {
    const hours = Math.floor(time / 60)
    const mins = time % 60
    const resultStr = `${hours}:${mins}`
    return resultStr
}

const calcMinTime = (startDate, startTime, endDate, endTime) => {
    const takeOfftime = new Date(`${startDate} ${startTime}`)
    const landTime = new Date(`${endDate} ${endTime}`)
    const totalMinFligthTime = (landTime - takeOfftime) / 60000
    return totalMinFligthTime
}

const strToMin = (str) => {
    const arrNum = str.split(":")
    const totalMin = +arrNum[0] * 60 + (+arrNum[1])
    return totalMin
}

const calcTotalFH = (initFH, legs, legId, legFH) => {
    const initFHMin = strToMin(initFH)
    let legsFHMim = 0
    for (let i = 0; i < (legId ? legId - 1 : legs.length); i++) {
        const element = legs[i].flightTime;
        legsFHMim += strToMin(element)
    }
    return initFHMin + (legs.length < 1 ? 0 : legsFHMim) + (legFH ? legFH : 0)
}

const calcTotalFC = (initFC, legs, legId) => {
    let legsFC = 0
    if (legs.length > 0) {
        for (let i = 0; i < (legId ? legId - 1 : legs.length); i++) {
            legsFC += 1
        }
    }
    return initFC + legsFC + (legId ? 1 : 0)
}

// ROUTERS

router.use(cors({
    origin: 'http://localhost:3000'
}))

// ADD AIRCRAFT
router.post('/add', async (req, res) => {
    try {
        const { msn, reg, type, initFH, initFC, FH, FC, legs } = req.body
        const aircraft = await Aircraft.create({ msn, reg, type, initFH, initFC, FH, FC, legs })
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
        let legs = air.legs

        let legtoPush = {
            legId: leg.legId,
            depDate: leg.depDate,
            flightNumber: leg.flightNumber,
            from: leg.from,
            to: leg.to,
            blockOFF: {
                date: leg.blockOFF.date,
                time: leg.blockOFF.time,
            },
            takeOFF: {
                date: leg.takeOFF.date,
                time: leg.takeOFF.time,
            },
            land: {
                date: leg.land.date,
                time: leg.land.time,
            },
            blockON: {
                date: leg.blockON.date,
                time: leg.blockON.time,
            },
            flightTime: minToStr(calcMinTime(leg.takeOFF.date, leg.takeOFF.time, leg.land.date, leg.land.time)),
            blockTime: minToStr(calcMinTime(leg.blockOFF.date, leg.blockOFF.time, leg.blockON.date, leg.blockON.time)),
            totalFH: minToStr(calcTotalFH(air.initFH, legs, leg.legId, calcMinTime(leg.takeOFF.date, leg.takeOFF.time, leg.land.date, leg.land.time))),
            totalFC: calcTotalFC(air.initFC, legs, leg.legId),
        }

        await Aircraft.updateOne(
            air,
            { $push: { legs: legtoPush } },
        );

        await Aircraft.updateOne(
            { msn: msn },
            { FH: minToStr(calcTotalFH(air.initFH, legs, leg.legId, calcMinTime(leg.takeOFF.date, leg.takeOFF.time, leg.land.date, leg.land.time))), FC: calcTotalFC(air.initFC, legs, leg.legId) }, { upsert: true });


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

router.post('/legs/red', async (req, res) => {
    try {
        const { msn, leg, legId } = req.body
        const air = await Aircraft.findOne({ msn: msn }).exec();
        let legs = air.legs

        let legtoPush = {
            legId: legId,
            depDate: leg.depDate,
            flightNumber: leg.flightNumber,
            from: leg.from,
            to: leg.to,
            blockOFF: {
                date: leg.blockOFF.date,
                time: leg.blockOFF.time,
            },
            takeOFF: {
                date: leg.takeOFF.date,
                time: leg.takeOFF.time,
            },
            land: {
                date: leg.land.date,
                time: leg.land.time,
            },
            blockON: {
                date: leg.blockON.date,
                time: leg.blockON.time,
            },
            flightTime: minToStr(calcMinTime(leg.takeOFF.date, leg.takeOFF.time, leg.land.date, leg.land.time)),
            blockTime: minToStr(calcMinTime(leg.blockOFF.date, leg.blockOFF.time, leg.blockON.date, leg.blockON.time)),
            totalFH: minToStr(calcTotalFH(air.initFH, legs, legId, calcMinTime(leg.takeOFF.date, leg.takeOFF.time, leg.land.date, leg.land.time))),
            totalFC: calcTotalFC(air.initFC, legs, legId),
        }

        legs.forEach(function (item, i) { if (item.legId == legId) legs[i] = legtoPush });

        legs.map((leg) => {
            leg.totalFH = minToStr(calcTotalFH(air.initFH, legs, leg.legId, strToMin(leg.flightTime)))
            leg.totalFC = calcTotalFC(air.initFC, legs, leg.legId)
        })
        await Aircraft.updateOne(
            { msn: msn },
            { legs: legs }, { upsert: true });

        await Aircraft.updateOne(
            { msn: msn },
            { FH: minToStr(calcTotalFH(air.initFH, legs)), FC: calcTotalFC(air.initFC, legs) }, { upsert: true });

        res.json({
            resultCode: 1,
            message: "Leg succesfully red"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            resultCode: 0,
            message: error
        })
    }
})

router.post('/legs/del', async (req, res) => {
    try {
        const { msn, legId } = req.body
        const air = await Aircraft.findOne({ msn: msn }).exec();
        let legs = air.legs


        legs.splice(legId - 1, 1)


        legs.map((leg) => {
            leg.legId = legs.indexOf(leg) + 1
            leg.totalFH = minToStr(calcTotalFH(air.initFH, legs, leg.legId, strToMin(leg.flightTime)))
            leg.totalFC = calcTotalFC(air.initFC, legs, leg.legId)
        })


        await Aircraft.updateOne(
            { msn: msn },
            { legs: legs }, { upsert: true });

        await Aircraft.updateOne(
            { msn: msn },
            { FH: minToStr(calcTotalFH(air.initFH, legs)), FC: calcTotalFC(air.initFC, legs) }, { upsert: true });

        res.json({
            resultCode: 1,
            message: "Leg succesfully deleted"
        })

    } catch (error) {
        console.log(error)
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
// GET SORTED AIRCRAFT LEGS
router.get('/sortlegs', async (req, res) => {
    try {
        const { msn, from, to } = req.query
        const aircraft = await Aircraft.findOne({ msn: msn }).exec();

        const legs = aircraft.legs.filter(function (leg) {
            const startDate = new Date(from).getTime()
            const endDate = new Date(to).getTime()
            const depDate = new Date(leg.depDate).getTime()
            return (depDate <= endDate) && (depDate >= startDate)
        });
        res.json(legs)
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