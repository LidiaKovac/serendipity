import style from "./Modal.module.scss"
import { FaPlay } from "react-icons/fa"
import { IoIosSpeedometer } from "react-icons/io"
import { HiOutlineClock } from "react-icons/hi"
import {MdOutlineClose} from "react-icons/md"
import { BsFillCalendarWeekFill, BsFillBookmarkFill } from "react-icons/bs"

export const Modal = ({ isOpen, close, course }: { isOpen: boolean, close: () => void, course: Course }) => {
    return isOpen && <> <div onClick={() => close()} className={style["modal__backdrop"]}>

    </div>
        <div className={style["modal"]}>
            <div className={style["close__button"]} onClick={()=> close()}>
                <MdOutlineClose/>
            </div>
            <div className={style["modal__header"]}>

                <img src={course.img} alt="" />
                <div className={style["modal__commands"]}>

                    <button>
                        <FaPlay />
                    </button>
                    <button>
                        <BsFillCalendarWeekFill />
                    </button>
                    <button>
                        <BsFillBookmarkFill />
                    </button>
                </div>

            </div>
            <div className={style["modal__details"]}>
                <h2>{course.title}</h2>
                <div className={style["card__duration"]}>
                    <HiOutlineClock /> {course.duration} min
                </div>
                <div className={style["card__level"]}>
                    <IoIosSpeedometer color="lightblue" /> Livello {course.level}
                </div>

            </div>
            <div className={style["modal__description"]}>
                {course.description}
            </div>
        </div></>


}