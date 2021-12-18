import s from "./legs.module.css"
import LegsAddForm from "./LegsAddForm/LegsAddForm"
import { useState } from "react"
import Preloader from "../../common/preloader/Preloader"
import LegResMes from "./legResMes/LegResMes"
import MainButton from "../../common/buttons/MainButton"
import LegRedForm from "./legsRedForm/LegRedForm"
import LegDelForm from "./legDelForm/LegDelForm"
import LegsPrintForm from "./legsPrintForm/LegsPrintForm"
import LegsHeader from "./LegsHeader/LegsHeader"
import LegsAircraftInfo from "./LegsAircraftInfo/LegsAircraftInfo"
import LegsBlock from "./LegsBlock/LegsBlock"
import { CSSTransition } from 'react-transition-group';

const Legs = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [changeMode, setChangeMode] = useState(false)
    let [changeLegMode, setChangeLegMode] = useState({ isMode: false, legId: 'id' })
    let [delLegMode, setDelLegMode] = useState({ isDelMode: false, legId: 'id' })
    let [legPrintMode, setlegPrintMode] = useState(false)

    // ANIMATION 
    const [showMessage, setShowMessage] = useState(false);

    setTimeout(() => {
        setShowMessage(true)
    }, 1);



    return (
        <div className={s.legs}>
            {props.isPreloader ? <Preloader /> : null}
            <div>
                <CSSTransition in={showMessage} timeout={900} classNames={{ ...s }} unmountOnExit  >
                    <LegsHeader
                        aircrafts={props.aircrafts}
                        getAircraftInfo={props.getAircraftInfo}
                        getLegs={props.getLegs} />

                </CSSTransition>
                {props.aircraftInfo
                    ? <LegsAircraftInfo
                        aircraftInfo={props.aircraftInfo} />
                    : null}
                {legPrintMode
                    ? <LegsPrintForm
                        aircraftInfo={props.aircraftInfo}
                        sortedLegs={props.sortedLegs}
                        getLegs={props.getLegs}
                        getSortedLegs={props.getSortedLegs}
                        setlegPrintMode={setlegPrintMode} />
                    : props.legs
                        ? <div className={s.legsBlock}>
                            {changeLegMode.isMode
                                ? <div className={s.legChangeForm}>
                                    <LegRedForm
                                        setChangeLegMode={setChangeLegMode}
                                        aircraftInfo={props.aircraftInfo}
                                        legId={changeLegMode.legId}
                                        legs={props.legs}
                                        redLeg={props.redLeg} />
                                </div>
                                : null}
                            {delLegMode.isDelMode
                                ? <LegDelForm
                                    setDelLegMode={setDelLegMode}
                                    aircraftInfo={props.aircraftInfo}
                                    legId={delLegMode.legId}
                                    delLeg={props.delLeg} />
                                : null}
                            <LegsBlock
                                legs={props.legs}
                                setDelLegMode={setDelLegMode}
                                setChangeLegMode={setChangeLegMode}
                                changeMode={changeMode} />
                            {(props.aircraftInfo && !editMode && !changeMode)
                                ? <div className={s.legsContPanel} >
                                    <MainButton onClick={() => setEditMode(true)} buttonText="Add" />
                                    <MainButton onClick={() => setChangeMode(true)} buttonText="Change" />
                                    <MainButton onClick={() => setlegPrintMode(true)} buttonText="Report" />
                                </div>
                                : changeMode ? <div className={s.legsContPanel}  >
                                    <MainButton onClick={() => setChangeMode(false)} buttonText="Cancel" />
                                </div> : null}
                        </div>
                        : null}
                {editMode
                    ? <LegsAddForm
                        setEditMode={setEditMode}
                        addLeg={props.addLeg}
                        aircraftInfo={props.aircraftInfo}
                        legsAddRes={props.legsAddRes}
                        legs={props.legs} />
                    : null}
                {props.legsAddRes ? <LegResMes legsAddRes={props.legsAddRes} /> : null}
            </div>
        </div>
    )
}

export default Legs