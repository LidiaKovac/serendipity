import { Card } from "../../components/Card/Card"
import { useState } from "react"

import style from "./Courses.module.scss"
import { useLoaderData } from "react-router-dom"
import { Selected } from "../../components/Selected/Selected"

export const Courses = () => {
  const { courses, favs: preloadedFavs } = useLoaderData() as { courses: Course[], favs: Course[] }
  const [favs, setFavs] = useState<Course[]>(preloadedFavs)
  const [selected, setSelected] = useState<Course | null>(null)
  const [isModalOpen, setOpenModal] = useState<boolean>(true)




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
        {selected && <Selected updateFavs={(fvs) => setFavs(fvs)} isModalOpen={isModalOpen} setOpenModal={setOpenModal} isFav={favs.some(fav => fav._id === selected._id)} selected={selected} />}
      </div>
    </div>
  )
}
