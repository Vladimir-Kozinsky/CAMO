import { NavLink } from 'react-router-dom'
import s from './sideMenuApp.module.css'


const SideMenuApp = () => {
    return (
        <div className={s.sideMenuApp} >
            <nav>
                <ul>
                    <li><NavLink to="/aircrafts">Aircrafts</NavLink></li>
                    <li><NavLink to="/legs" >Legs</NavLink></li>
                </ul>
            </nav>


        </div>
    )
}

export default SideMenuApp