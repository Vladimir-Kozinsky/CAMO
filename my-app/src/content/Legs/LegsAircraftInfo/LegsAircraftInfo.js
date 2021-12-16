import s from "./LegsAircraftInfo.module.css"

const LegsAircraftInfo = (props) => {
    return (
        <div className={s.aircraftInfo}>
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
    )
}

export default LegsAircraftInfo