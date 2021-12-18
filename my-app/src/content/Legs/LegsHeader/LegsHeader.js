import MainButton from "../../../common/buttons/MainButton"
import s from "./LegsHeader.module.css"



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


    return (
        <div>
            <div className={s.legsHeader}>

                <h2>Choose aircraft</h2>
                <div className={s.listAircrafts}>
                    <select id="select">
                        {aircraftsArr}
                    </select>
                    <MainButton onClick={getAircraftInfo} buttonText="Choose" />
                </div>

            </div>
        </div>
    )
}

export default LegsHeader