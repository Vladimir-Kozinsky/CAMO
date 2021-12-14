import s from "./LegRedForm.module.css"
import React from 'react';
import { useFormik } from 'formik';
import MainButton from "../../../common/buttons/MainButton";

const LegRedForm = (props) => {

    let obj = props.legs.find(o => o.legId === props.legId);

    const formik = useFormik({
        initialValues: {
            depDate: obj.depDate,
            flightNumber: obj.flightNumber,
            from: obj.from,
            to: obj.to,
            blockOffDate: obj.blockOFF.date,
            blockOffTime: obj.blockOFF.time,
            takeOffDate: obj.takeOFF.date,
            takeOffTime: obj.takeOFF.time,
            landDate: obj.land.date,
            landTime: obj.land.time,
            blockOnDate: obj.blockON.date,
            blockOnTime: obj.blockON.time,
        },
        validate: values => {
            const errors = {};
            if (!values.flightNumber) {
                errors.flightNumber = 'Required';
            }
            return errors;
        },
        onSubmit: values => {
            let leg = {
                legId: props.legId,
                depDate: values.depDate,
                flightNumber: values.flightNumber,
                from: values.from,
                to: values.to,
                blockOFF: {
                    date: values.blockOffDate,
                    time: values.blockOffTime,
                },
                takeOFF: {
                    date: values.takeOffDate,
                    time: values.takeOffTime,
                },
                land: {
                    date: values.landDate,
                    time: values.landTime,
                },
                blockON: {
                    date: values.blockOnDate,
                    time: values.blockOnTime,
                },
            }

            props.redLeg(leg, props.aircraftInfo.msn, props.legId)

        },
    });

    return (
        <div className={s.legsAddContainer}>
            <form onSubmit={formik.handleSubmit}>

                <div className={s.LegsAddForm}>
                    <div className={s.fieldConutainer} >
                        <div className={s.fieldName}>
                            <label>UTC Dep.Date</label>
                        </div>
                        <div className={s.fieldValue} >
                            <input
                                id="depDate"
                                name="depDate"
                                onChange={formik.handleChange}
                                value={formik.values.depDate}
                                type="date" />
                        </div>
                    </div>
                    <div className={s.fieldConutainer} >
                        <div className={s.fieldName}>
                            <label>Flight Number</label>
                        </div>
                        <div className={s.fieldValue} >
                            <input
                                id="flightNumber"
                                name="flightNumber"
                                onChange={formik.handleChange}
                                value={formik.values.flightNumber}
                                type="text" />
                            <div>{formik.errors.flightNumber && formik.touched.flightNumber && formik.errors.flightNumber}</div>
                        </div>
                    </div>
                    <div className={s.fieldConutainer} >
                        <div className={s.fieldName}>
                            <label>From</label>
                        </div>
                        <div className={s.fieldValue} >
                            <input
                                id="from"
                                name="from"
                                onChange={formik.handleChange}
                                value={formik.values.from}
                                type="text" />
                        </div>
                    </div>
                    <div className={s.fieldConutainer} >
                        <div className={s.fieldName}>
                            <label>To</label>
                        </div>
                        <div className={s.fieldValue} >
                            <input
                                id="to"
                                name="to"
                                onChange={formik.handleChange}
                                value={formik.values.to}
                                type="text" />
                        </div>
                    </div>
                    <div className={s.fieldConutainer} >
                        <div className={s.fieldName}>
                            <label>Block OFF</label>
                        </div>
                        <div className={s.fieldValue} >
                            <div>
                                <input
                                    id="blockOffDate"
                                    name="blockOffDate"
                                    onChange={formik.handleChange}
                                    value={formik.values.blockOffDate}
                                    type="date" />
                            </div>
                            <div className={s.timeBlock}>
                                <input
                                    id="blockOffTime"
                                    name="blockOffTime"
                                    onChange={formik.handleChange}
                                    value={formik.values.blockOffTime}
                                    type="time" />
                            </div>
                        </div>
                    </div>
                    <div className={s.fieldConutainer} >
                        <div className={s.fieldName}>
                            <label>Take OFF</label>
                        </div>
                        <div className={s.fieldValue} >
                            <div>
                                <input
                                    id="takeOffDate"
                                    name="takeOffDate"
                                    onChange={formik.handleChange}
                                    value={formik.values.takeOffDate}
                                    type="date" />
                            </div>
                            <div className={s.timeBlock}>
                                <input
                                    id="takeOffTime"
                                    name="takeOffTime"
                                    onChange={formik.handleChange}
                                    value={formik.values.takeOffTime}
                                    type="time" />
                            </div>
                        </div>
                    </div>
                    <div className={s.fieldConutainer} >
                        <div className={s.fieldName}>
                            <label>Landing</label>
                        </div>
                        <div className={s.fieldValue} >
                            <div>
                                <input
                                    id="landDate"
                                    name="landDate"
                                    onChange={formik.handleChange}
                                    value={formik.values.landDate}
                                    type="date" />
                            </div>
                            <div className={s.timeBlock}>
                                <input
                                    id="landTime"
                                    name="landTime"
                                    onChange={formik.handleChange}
                                    value={formik.values.landTime}
                                    type="time" />
                            </div>
                        </div>
                    </div>
                    <div className={s.fieldConutainer} >
                        <div className={s.fieldName}>
                            <label>Block ON</label>
                        </div>
                        <div className={s.fieldValue} >
                            <div>
                                <input
                                    id="blockOnDate"
                                    name="blockOnDate"
                                    onChange={formik.handleChange}
                                    value={formik.values.blockOnDate}
                                    type="date" />
                            </div>
                            <div className={s.timeBlock}>
                                <input
                                    id="blockOnTime"
                                    name="blockOnTime"
                                    onChange={formik.handleChange}
                                    value={formik.values.blockOnTime}
                                    type="time" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.legAddBtnContainer}>
                    <MainButton type="submit" buttonText="Submit" />
                    <MainButton type="button" onClick={() => props.setChangeLegMode({ isMode: false })} buttonText="Cancel" />
                </div>
            </form>
        </div>
    )
}

export default LegRedForm