import style from "./Card.module.scss"
import pic from "../../assets/courses/img1.png"
import { IoIosSpeedometer } from "react-icons/io"
import { HiOutlineClock } from "react-icons/hi"
interface Props {
    course: Course,
    setSelected: (crs: Course) => void
    isSel: boolean
}
export const Card = ({ course, setSelected, isSel }: Props) => {
    const select = (crs: Course) => {
        setSelected(crs)
    }
    return (
        <div  className={`${style["card"]} ${isSel? style['selected'] : ""}`} onClick={() => select(course)}>
            <img src={course.img} alt="" />
            <div className={style["card__body"]}>

                <div className={style["card__title"]}>{course.title}</div>
                <div className={style["card__details"]}>
                    <div className={style["card__duration"]}>
                        <HiOutlineClock /> {course.duration} min
                    </div>
                    <div className={style["card__level"]}>
                        <IoIosSpeedometer color="lightblue" /> Livello {course.level}
                    </div>
                </div>
            </div>
        </div>
    )

}