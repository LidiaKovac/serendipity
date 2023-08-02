import { Link, useNavigate } from "react-router-dom"
import style from "./Navbar.module.scss"
export const Navbar = () => {
    const navigate = useNavigate()
    const isLogged = () => {
        const ls = localStorage.getItem("serendipity-token")! as string | null
        if (ls) {
            return true
        } else return false
    }
    const logout = () => {
        localStorage.removeItem("serendipity-token")
        navigate("/login")
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
                    <Link to="/login">Login</Link>

                </>
            }

        </nav>
    )

}