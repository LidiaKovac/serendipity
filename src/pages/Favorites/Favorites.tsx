import { Card } from "../../components/Card/Card"
import { useEffect, useState } from "react"
import { IoIosSpeedometer } from "react-icons/io"
import { HiOutlineClock } from "react-icons/hi"
import { FaPlay } from "react-icons/fa"
import { BsFillCalendarWeekFill, BsFillBookmarkFill, BsBookmarkXFill } from "react-icons/bs"

import style from "./Favorites.module.scss"
import { Modal } from "../../components/Modal/Modal"
import { useNavigate } from "react-router-dom"
import { getUserId } from "../../utils"
import { Selected } from "../../components/Selected/Selected"
export const Favourites = () => {
  const navigate = useNavigate()
  const [favs, setFavs] = useState<Course[]>([])
  const [rawFavs, setRawFavs] = useState<Fav[]>([])
  const [selected, setSelected] = useState<Course | null>(null)
  const [isModalOpen, setOpenModal] = useState<boolean>(false)
  const fetchFavs = async () => {
    const userId = getUserId()
    const res = await fetch(`http://localhost:3000/favourites?userId=${userId}`)
    const rawFavList = await res.json() as Fav[]
    setRawFavs(rawFavList)
    const populated: Course[] = []
    for (let i = 0; i < rawFavList.length; i++) {
      const { courseId } = rawFavList[i];
      const raw = await fetch(`http://localhost:3000/courses/${courseId}`)
      const crs = await raw.json() as Course
      populated.push(crs)
    }
    setFavs(populated)

  }

  useEffect(() => {
    const ls = JSON.parse(
      localStorage.getItem("serendipity-user")!
    ) as Auth | null
    console.log(ls)
    if (!ls) {
      navigate("/signup")
    } else {
      fetchFavs().finally(() => console.log("done"))
    }
  }, [])
  return (
    <div className={style["courses__wrap"]}>
      <h1>Preferiti</h1>
      <div className={style["courses__content"]}>
        <div className={style["courses__list"]}>
          {favs.length === 0 && <h2>Non hai ancora aggiunto nulla ai preferiti</h2>}
          {favs?.map((crs) => (
            <Card
              key={crs.id}
              isSel={crs.id === selected?.id}
              setSelected={(data: Course) => {
                setSelected(data)
                setOpenModal(true)
              }}
              course={crs}
            />
          ))}
        </div>
        {selected && <Selected updateFavs={() => { setSelected(null); fetchFavs().finally(() => console.log("done")) }} selected={selected} />}
      </div>
    </div>
  )
}
