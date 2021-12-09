import s from './MainButton.module.css'

const MainButton = (props) => {
    return (
        <button className={s.mainButton} onClick={props.onClick} type={props.type} >{props.buttonText}</button>
    )
}

export default MainButton