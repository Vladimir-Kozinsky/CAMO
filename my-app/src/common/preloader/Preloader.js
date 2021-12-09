import s from "./preloader.module.css"
import preloaderImg from "./img/preloader.gif"

const Preloader = () => {
    return (
        <div className={s.preloader}>
            <img src={preloaderImg} alt="loaderImg" />
        </div>
    )
}

export default Preloader