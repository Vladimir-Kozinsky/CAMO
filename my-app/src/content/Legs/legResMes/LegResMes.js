import s from "./LegResMes.module.css"

const LegResMes = (props) => {
    return (
        <div className={s.legsAddResMessage} >
            {props.legsAddRes.message}
        </div>
    )
}

export default LegResMes