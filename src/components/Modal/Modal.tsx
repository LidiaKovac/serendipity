import style from "./Modal.module.scss"
import { FaPlay } from "react-icons/fa"
import { IoIosSpeedometer } from "react-icons/io"
import { HiOutlineClock } from "react-icons/hi"
import { MdOutlineClose } from "react-icons/md"
import { BsFillCalendarWeekFill, BsFillBookmarkFill, BsBookmarkXFill } from "react-icons/bs"
interface Props {
    isOpen: boolean
    close: () => void
    selected: Course
    isFav: boolean
    removeFav: () => void
    addToFav: () => void
}
export const Modal = ({ isOpen, close, selected, isFav, removeFav, addToFav }: Props) => {

    return isOpen && <>
        <div onClick={() => close()} className={style["modal__backdrop"]}></div>
        <div className={style["modal"]}>
            <div className={style["close__button"]} onClick={() => close()}>
                <MdOutlineClose />
            </div>
            <div className={style["modal__header"]}>
                <img src={selected.img} alt="thumbnail" />
                <div className={style["modal__commands"]}>

                    <button>
                        <FaPlay />
                    </button>
                    <button>
                        <BsFillCalendarWeekFill />
                    </button>
                    <button onClick={() => {
                        if (isFav) {
                            removeFav()
                        } else addToFav()
                    }}>
                        {
                            isFav ? <BsBookmarkXFill /> : <BsFillBookmarkFill />
                        }

                    </button>
                </div>

            </div>
            <div className={style["modal__details"]}>
                <h2>{selected.title}</h2>
                <div className={style["card__duration"]}>
                    <HiOutlineClock /> {selected.duration} min
                </div>
                <div className={style["card__level"]}>
                    <IoIosSpeedometer color="lightblue" /> Livello {selected.level}
                </div>

            </div>
            <div className={style["modal__description"]}>
                {selected.description}
            </div>
        </div></>


}