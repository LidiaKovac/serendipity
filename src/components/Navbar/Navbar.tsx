import { Link, useNavigate } from "react-router-dom"
import style from "./Navbar.module.scss"
export const Navbar = () => {
    const navigate = useNavigate()
    const isLogged = () => {
        const ls = JSON.parse(localStorage.getItem("serendipity-user")!) as User | null
        if (ls) {
            return true
        } else return false
    }
    const logout = () => {
        localStorage.removeItem("serendipity-user")
        navigate("/signin")
    }
    return (
        <nav className={style["navbar"]}>
            {
                isLogged() && (<>         <Link to="/courses">Percorsi</Link>
                    <Link to="/favs">Preferiti</Link>
                    <div onClick={logout}>Logout</div>
                </>)
            }
            {
                !isLogged() && <>
                    <Link to="/signup">Register</Link>
                    <Link to="/signin">Login</Link>

                </>
            }

        </nav>
    )

}