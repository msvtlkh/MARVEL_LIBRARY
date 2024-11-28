import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'


const Header = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title__wrapper}>
                <h1 className={styles.marked__title}>Marvel</h1>
                <h1>information portal</h1>
            </div>

            <ul className={styles.list}>
                <li>
                    <NavLink to='/' style={({ isActive }) => ({color: isActive ? '#9F0013' : 'black'})}>Characters</NavLink>
                </li>
                <div className={styles.decor}>/</div>
                <li>
                    <NavLink to='/comics' style={({ isActive }) => ({color: isActive ? '#9F0013' : 'black'})}>Comics</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Header