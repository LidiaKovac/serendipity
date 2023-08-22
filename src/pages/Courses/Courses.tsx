import { Card } from "../../components/Card/Card"
import { useState, useEffect } from "react"

import style from "./Courses.module.scss"
import { Selected } from "../../components/Selected/Selected"
import { RootState, useAppDispatch, useAppSelector } from "../../redux"
import { getCourses, setSelected } from "../../redux/slices/courseSlice"
import { getFavs } from "../../redux/slices/favsSlice"

export const Courses = () => {
  const favs = useAppSelector((state:RootState)=> state.favs.favs)

  const {courses, selected} = useAppSelector((state:RootState)=> state.courses)
  const dispatch = useAppDispatch()
  const [isModalOpen, setOpenModal] = useState<boolean>(true)

  useEffect(() => {
    void dispatch(getCourses(null))
    void dispatch(getFavs(null))
    // eslint-disable-next-line
  }, [])

  return (

    <div className={style["courses__wrap"]}>

      <h1>Percorsi</h1>
      <div className={style["courses__content"]}>
        <div className={style["courses__list"]}>
          {courses.map((crs) => (
            <Card
            key={crs._id}
              isSel={crs._id === selected?._id}
              setSelected={(data: Course) => {
                dispatch(setSelected(data))
                setOpenModal(true)
              }}
              course={crs}
            />
          ))}
        </div>
        {selected && <Selected  isModalOpen={isModalOpen} setOpenModal={setOpenModal} isFav={favs.some(fav => fav._id === selected._id)} />}
      </div>
    </div>
  )
}
