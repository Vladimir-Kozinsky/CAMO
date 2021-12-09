import { NavLink } from 'react-router-dom'
import s from './sideMenuApp.module.css'


const SideMenuApp = () => {
    return (
        <div className={s.sideMenuApp} >
            <NavLink to="/legs" >Legs</NavLink>
            
        </div>
    )
}

export default SideMenuApp