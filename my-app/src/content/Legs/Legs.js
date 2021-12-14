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
    let [changeLegMode, setChangeLegMode] = useState({ isMode: false, legId: 'id' })
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
            <div className={s.legItem} key={leg.legId}>

                {changeMode ? <div className={s.ledItemBtnBlock} >
                    <button className={s.redBtn} onClick={() => setChangeLegMode({ isMode: true, legId: leg.legId })} ></button>
                    <button className={s.delBtn}></button>
                </div> : null}
                <div className={s.columns}>
                    <div className={s.depDateTh}>{leg.depDate}</div>
                    <div className={s.flightNumber}>{leg.flightNumber}</div>
                    <div className={s.from}>{leg.from}</div>
                    <div className={s.to}>{leg.to}</div>
                    <div className={s.blockOFF}>{leg.blockOFF.time}</div>
                    <div className={s.takeOFF}>{leg.takeOFF.time}</div>
                    <div className={s.land}>{leg.land.time}</div>
                    <div className={s.blockON}>{leg.blockON.time}</div>
                    <div className={s.blockON}>{leg.flightTime}</div>
                    <div className={s.blockON}>{leg.blockTime}</div>
                    <div className={s.totalFH}>{leg.totalFH}</div>
                    <div className={s.totalFC}>{leg.totalFC}</div>
                </div>
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
                                legId={changeLegMode.legId}
                                legs={props.legs}
                                redLeg={props.redLeg} />
                        </div> : null}
                        <div className={s.legsContainer}>
                            <div className={s.tableHeader}>
                                {changeMode ? <div className={s.ledItemBtnBlock}> </div> : null}
                                <div className={s.columns}>
                                    <div>UTC Dep.Date</div>
                                    <div>Flight Number</div>
                                    <div>From</div>
                                    <div>To</div>
                                    <div>BlockOFF</div>
                                    <div>Take OFF</div>
                                    <div>Landing</div>
                                    <div>Block ON</div>
                                    <div>Flight Time</div>
                                    <div>Block Time</div>
                                    <div>Total FH</div>
                                    <div>Total FC</div>
                                </div>
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
                    legs={props.legs}
                /> : null}
                {props.legsAddRes ? <LegResMes legsAddRes={props.legsAddRes} /> : null}
            </div>
        </div>
    )
}

export default Legs