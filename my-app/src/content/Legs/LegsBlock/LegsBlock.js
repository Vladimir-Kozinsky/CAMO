import s from "./LegsBlock.module.css"

const LegsBlock = (props) => {
    let legs = props.legs ? props.legs.map((leg) => {
        return (
            <div className={s.legItem} key={leg.legId}>

                {props.changeMode ? <div className={s.ledItemBtnBlock} >
                    <button className={s.redBtn} onClick={() => props.setChangeLegMode({ isMode: true, legId: leg.legId })} ></button>
                    <button className={s.delBtn} onClick={() => props.setDelLegMode({ isDelMode: true, legId: leg.legId })}></button>
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
        <div className={s.legsContainer}>
            <div className={s.tableHeader}>
                {props.changeMode ? <div className={s.ledItemBtnBlock}> </div> : null}
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
    )
}

export default LegsBlock