import style from "./Homepage.module.scss"
import photo from "../../assets/homepage.png"
import { Button } from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"
export const Homepage = () => {
    const navigate = useNavigate()
    return <div className={style["homepage__wrap"]}>

        <h1> Il tuo corpo è <br className={style["hide"]} /> <span id={style["rotating"]}> <span>funzionale</span> <span>magnifico</span> <span>unico</span> </span></h1>
        <div className={style["homepage__content"]}>
            <p>
                Serendipity è la prima piattaforma
                di allenamento online pensata per
                essere completamente body neutral,
                body positive e accessibile.
                <br /><br />
                Allenati in serenità e
                seguendo i tuoi ritmi.
                <p>
                    <Button content="Scopri" action={()=> navigate("/courses")} />
                </p>
            </p>
            <img src={photo} alt="person doing yoga" />

        </div>

    </div>

}