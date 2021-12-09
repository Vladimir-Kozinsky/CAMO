import s from "./legs.module.css"
import LegsAddForm from "./LegsAddForm/LegsAddForm"
import { useState } from "react"
import Preloader from "../../common/preloader/Preloader"
import LegResMes from "./legResMes/LegResMes"
import MainButton from "../../common/buttons/MainButton"
import LegRedForm from "./legsRedForm/LegRedForm"

const Legs = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [changeMode, setChangeMode] = useState(false)
    let [changeLegMode, setChangeLegMode] = useState({isMode:false, id:'id'})
    console.log(changeLegMode)

    const getAircraftInfo = () => {
        const msn = getValue()
        props.getAircraftInfo(msn)
        props.getLegs(msn)
    }

    const getValue = () => {
        const sel = document.getElementById("select")
        const value = sel.options[sel.selectedIndex].value;
        return value
    }

    let aircraftsArr = props.aircrafts.map((aircraft) => {
        return (
            <option key={aircraft} className={s.selectAircraftItem} value={aircraft} >{"MSN " + aircraft}</option>
        )
    })
    let legs = props.legs ? props.legs.map((leg) => {
        return (
            <div className={s.legItem} key={leg._id}>

                {changeMode ? <div className={s.ledItemBtnBlock} >
                    <input type="checkbox" id={leg._id} name="field" />
                    <button className={s.redBtn} onClick={() => setChangeLegMode({isMode:true, id:leg._id})} >/</button>
                    <button className={s.delBtn}>X</button>
                </div> : null}
                <table>
                    <tbody>
                        <tr >
                            <th className={s.depDateTh}>{leg.depDate}</th>
                            <th className={s.flightNumber}>{leg.flightNumber}</th>
                            <th className={s.from}>{leg.from}</th>
                            <th className={s.to}>{leg.to}</th>
                            <th className={s.blockOFF}>{leg.blockOFF.time}</th>
                            <th className={s.takeOFF}>{leg.takeOFF.time}</th>
                            <th className={s.land}>{leg.land.time}</th>
                            <th className={s.blockON}>{leg.blockON.time}</th>
                            <th className={s.totalFH}>{leg.totalFH}</th>
                            <th className={s.totalFC}>{leg.totalFC}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }) : null



    return (
        <div className={s.legs}>
            {props.isPreloader ? <Preloader /> : null}
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
                {props.aircraftInfo
                    ? <div className={s.aircraftInfo}>

                        <div>
                            <label>Type:</label>
                            <input disabled value={props.aircraftInfo.type} />
                        </div>
                        <div>
                            <label>MSN:</label>
                            <input disabled value={props.aircraftInfo.msn} />
                        </div>
                        <div>
                            <label>Reg.:</label>
                            <input disabled value={props.aircraftInfo.reg} />
                        </div>
                        <div>
                            <label>FH:</label>
                            <input disabled value={props.aircraftInfo.FH} />
                        </div>
                        <div>
                            <label>FC:</label>
                            <input disabled value={props.aircraftInfo.FC} />
                        </div>
                    </div>
                    : null}
                {props.legs
                    ? <div className={s.legsBlock}>
                        {changeLegMode.isMode ? <div className={s.legChangeForm}>
                            <LegRedForm
                                setChangeLegMode={setChangeLegMode}
                                aircraftInfo={props.aircraftInfo}
                                legId={changeLegMode.id}
                                legs={props.legs} />
                        </div> : null}
                        <div className={s.legsContainer}>
                            <div className={s.tableHeader}>
                                {changeMode ? <input type="checkbox" id="all" /> : null}
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>UTC Dep.Date</th>
                                            <th>Flight Number</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>BlockOFF</th>
                                            <th>Take OFF</th>
                                            <th>Landing</th>
                                            <th>Block ON</th>
                                            <th>Total FH</th>
                                            <th>Total FC</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {legs}
                        </div>

                        {(props.aircraftInfo && !editMode && !changeMode)
                            ? <div className={s.legsContPanel} >
                                <MainButton onClick={() => setEditMode(true)} buttonText="Add" />
                                <MainButton onClick={() => setChangeMode(true)} buttonText="Change" />
                                <MainButton buttonText="Delete" />
                                <MainButton buttonText="Print" />
                            </div>
                            : changeMode ? <div className={s.legsContPanel}  >
                                <MainButton onClick={() => setChangeMode(false)} buttonText="Cancel" />
                            </div> : null}
                    </div>
                    : null}

                {editMode ? <LegsAddForm
                    setEditMode={setEditMode}
                    addLeg={props.addLeg}
                    aircraftInfo={props.aircraftInfo}
                    legsAddRes={props.legsAddRes}
                /> : null}
                {props.legsAddRes ? <LegResMes legsAddRes={props.legsAddRes} /> : null}
            </div>
        </div>
    )
}

export default Legs