import { Card } from "../../components/Card/Card"
import {  useState } from "react"

import style from "./Favorites.module.scss"

import { Selected } from "../../components/Selected/Selected"
import { useLoaderData } from "react-router-dom"

export const Favourites = () => {
  const preloadedFavs = useLoaderData() as Course[]
  const [favs, setFavs] = useState<Course[]>(preloadedFavs)
  const [selected, setSelected] = useState<Course | null>(null)
  const [isModalOpen, setOpenModal] = useState<boolean>(false)


  return (
    <div className={style["courses__wrap"]}>
      <h1>Preferiti</h1>
      <div className={style["courses__content"]}>
        <div className={style["courses__list"]}>
          {favs.length === 0 && <h2>Non hai ancora aggiunto nulla ai preferiti</h2>}
          {favs?.map((crs) => (
            <Card
              key={crs._id}
              isSel={crs._id === selected?._id}
              setSelected={(data: Course) => {
                setSelected(data)
                setOpenModal(true)
              }}
              course={crs}
            />
          ))}
        </div>
        {selected && <Selected updateFavs={(fvs) => { setSelected(null); setFavs(fvs) }} isModalOpen={isModalOpen} setOpenModal={setOpenModal} isFav={favs.some(fav => fav._id === selected._id)} selected={selected} />}
      </div>
    </div>
  )
}
