import { Card } from "../../components/Card/Card"
import { useState, useEffect } from "react"

import style from "./Courses.module.scss"
import { Selected } from "../../components/Selected/Selected"
import { RootState, useAppDispatch, useAppSelector } from "../../redux"
import { getCourses } from "../../redux/slices/courseSlice"
import { getFavs } from "../../redux/slices/favsSlice"

export const Courses = () => {
  const { favs: { favs }, courses: { courses } } = useAppSelector((state: RootState) => state)
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState<Course | null>(null)
  const [isModalOpen, setOpenModal] = useState<boolean>(true)

  useEffect(() => {
    void dispatch(getCourses(null))
    void dispatch(getFavs(null))
  }, [])

  return (

    <div className={style["courses__wrap"]}>

      <h1>Percorsi</h1>
      <div className={style["courses__content"]}>
        <div className={style["courses__list"]}>
          {courses.map((crs) => (
            <Card
              isSel={crs._id === selected?._id}
              setSelected={(data: Course) => {
                setSelected(data)
                setOpenModal(true)
              }}
              course={crs}
            />
          ))}
        </div>
        {selected && <Selected  isModalOpen={isModalOpen} setOpenModal={setOpenModal} isFav={favs.some(fav => fav._id === selected._id)} selected={selected} />}
      </div>
    </div>
  )
}
