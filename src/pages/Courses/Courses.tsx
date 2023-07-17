import { Card } from "../../components/Card/Card"
import { useEffect, useState } from "react"
import { IoIosSpeedometer } from "react-icons/io"
import { HiOutlineClock } from "react-icons/hi"
import { FaPlay } from "react-icons/fa"
import { BsFillCalendarWeekFill, BsFillBookmarkFill } from "react-icons/bs"

import style from "./Courses.module.scss"
import { Modal } from "../../components/Modal/Modal"
export const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const [selected, setSelected] = useState<Course | null>(null)
    const [isModalOpen, setOpenModal] = useState<boolean>(true)
    useEffect(() => {
        fetch("http://localhost:3000/courses")
            .then(res => res.json())
            .then(crs => setCourses(crs as Course[]))
            .catch(err => console.error(err))
    }, [])
    return (
        <div className={style["courses__wrap"]}>
            <h1>Percorsi</h1>
            <div className={style["courses__content"]}>
                <div className={style["courses__list"]}>
                    {
                        courses.map(crs => <Card isSel={crs.id === selected?.id} setSelected={(data: Course) => {
                            setSelected(data)
                            setOpenModal(true)
                        }} course={crs} />)
                    }
                </div>
                {selected && <div className={style["courses__selected"]}>
                    <div className={style["selected__header"]}>
                        <img src={selected.img} alt="" /> <div className={style["selected__commands"]}>
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
                    <div className={style["selected__details"]}>
                        <h2>{selected.title}</h2>
                        <div className={style["card__duration"]}>
                            <HiOutlineClock /> {selected.duration} min
                        </div>
                        <div className={style["card__level"]}>
                            <IoIosSpeedometer color="lightblue" /> Livello {selected.level}
                        </div>
                        <div className={style["selected__description"]}>
                            {selected.description}
                        </div>
                    </div>
                </div>}
            </div>
            {selected && <Modal course={selected} isOpen={isModalOpen} close={() => setOpenModal(false)} />}
        </div>
    )

}