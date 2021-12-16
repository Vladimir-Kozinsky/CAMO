import MainButton from "../../../common/buttons/MainButton"
import s from "./LegsHeader.module.css"
import { CSSTransition } from 'react-transition-group';
import { useState } from "react";


const LegsHeader = (props) => {

    const getValue = () => {
        const sel = document.getElementById("select")
        const value = sel.options[sel.selectedIndex].value;
        return value
    }
    const getAircraftInfo = () => {
        const msn = getValue()
        props.getAircraftInfo(msn)
        props.getLegs(msn)
    }

    let aircraftsArr = props.aircrafts.map((aircraft) => {
        return (
            <option key={aircraft} className={s.selectAircraftItem} value={aircraft} >{"MSN " + aircraft}</option>
        )
    })

    // ANIMATION 


    const [showButton, setShowButton] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    setTimeout(() => {
        setShowMessage(true)
    }, 200);

    return (

        <CSSTransition in={showMessage} timeout={300} classNames={{ ...s }} unmountOnExit
            onEnter={() => setShowButton(false)}
            onExited={() => setShowButton(true)}>
            <div className={s.legsHeader}>
                {showButton && (
                    <button type="button" onClick={() => setShowMessage(true)}>Click to Enter</button>
                )}
                <h2>Choose aircraft</h2>
                <div className={s.listAircrafts}>
                    <select id="select">
                        {aircraftsArr}
                    </select>
                    <MainButton onClick={getAircraftInfo} buttonText="Choose" />
                </div>

            </div>
        </CSSTransition>

    )
}

export default LegsHeader