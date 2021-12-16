import MainButton from "../../../common/buttons/MainButton"
import s from "./LegDelForm.module.css"

const LegDelForm = (props) => {

    const delLeg = () => {
       props.delLeg(props.aircraftInfo.msn, props.legId)
       props.setDelLegMode(false)
    }

    return (
        <div className={s.delLegForm} >
            <h3>Do you want to delete this leg?</h3>
            <div className={s.buttonsContainer}>
                <MainButton buttonText="Delete" onClick={delLeg} />
                <MainButton onClick={() => props.setDelLegMode(true)} buttonText="Cancel" setChangeLegMode={props.setDelLegMode} />
            </div>

        </div>
    )
}

export default LegDelForm