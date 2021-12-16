import MainButton from "../../../common/buttons/MainButton";
import s from "./LegsPrintForm.module.css"
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import ReactToPrint from 'react-to-print';
import LegsToPrint from "./componentToPrint/LegsToPrint";

const LegsPrintForm = (props) => {

    const formik = useFormik({
        initialValues: {
            from: "2021-12-01",
            to: "2021-12-30"
        },
        validate: values => {
            const errors = {};
            // if (!values.flightNumber) {
            //     errors.flightNumber = 'Required';
            // }
            return errors;
        },
        onSubmit: values => {
            props.getSortedLegs(props.aircraftInfo.msn, values.from, values.to)
        },
    });
    const componentRef = useRef();
    return (
        <div className={s.legsPrintForm}>
            <div className={s.sortPanelContainer} >
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.sortPanel}>

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
                                    type="date" />
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
                                    type="date" />
                            </div>
                        </div>

                        <div className={s.legAddBtnContainer}>
                            <MainButton type="submit" buttonText="Sort" />
                        </div>
                    </div>

                </form>
            </div>

            <LegsToPrint ref={componentRef}
                aircraftInfo={props.aircraftInfo}
                sortedLegs={props.sortedLegs}
                from={document.getElementById('from') ? document.getElementById('from').value : formik.initialValues.from}
                to={document.getElementById('to') ? document.getElementById('to').value : formik.initialValues.to} />
            <div className={s.legsPrintFormButtons}>
                <ReactToPrint
                    trigger={() => <MainButton buttonText="Print" />}
                    content={() => componentRef.current} />
                <MainButton buttonText="Back" onClick={() => props.setlegPrintMode(false)} />
            </div>

        </div>
    )
}

export default LegsPrintForm