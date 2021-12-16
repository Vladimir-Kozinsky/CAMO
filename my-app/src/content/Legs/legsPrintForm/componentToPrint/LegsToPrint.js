import s from "./LegsToPrint.module.css"
import React from "react";


const LegsToPrint = React.forwardRef((props, ref) => {


    let sortedLegs = props.sortedLegs ? props.sortedLegs.map((leg) => {
        return (
            <div className={s.legItem}>
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
        <div className={s.printBlock} ref={ref}>
            <h2>REPORT From {props.from} To {props.to} </h2>
            <div className={s.legsReportHeader}>
                <div className={s.legsReportACInfo}>
                    <div>
                        <ul>
                            <li>Aircraft type:</li>
                            <li>MSN:</li>
                            <li>Reg.:</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>{props.aircraftInfo.type}  </li>
                            <li>{props.aircraftInfo.msn}  </li>
                            <li>{props.aircraftInfo.reg}</li>
                        </ul>
                    </div>


                </div>
                <div className={s.legsReportInfo}>
                    <div>
                        <ul>
                            <li>Create date:  </li>
                            <li>Create time:  </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>{new Date().toLocaleString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })} </li>
                            <li> {new Date().toLocaleString("en-US", { hour: 'numeric', minute: 'numeric' })} </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className={s.tableHeader}>
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
            {sortedLegs}
        </div >
    );
});

export default LegsToPrint