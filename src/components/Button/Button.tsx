import { Link } from "react-router-dom"
import style from "./Button.module.scss"
export const Button = ({ content, location }: { content: string, location: string }) => {
    return (
        <Link to={location}>
            <button className={style["btn"]}>
                {content}
            </button>
        </Link>
    )

}