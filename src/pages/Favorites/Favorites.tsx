import { Card } from "../../components/Card/Card"
import { useState, useEffect, useCallback } from "react"

import style from "./Favorites.module.scss"

import { Selected } from "../../components/Selected/Selected"
import { RootState, useAppDispatch, useAppSelector } from "../../redux"
import { getFavs } from "../../redux/slices/favsSlice"

export const Favourites = () => {
  const favs: Course[] = useAppSelector((state: RootState) => state.favs.favs)
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState<Course | null>(null)
  const [isModalOpen, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    void dispatch(getFavs(null))
  }, [])
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
        {selected && <Selected isModalOpen={isModalOpen} setOpenModal={setOpenModal} isFav={favs.some(fav => fav._id === selected._id)} selected={selected} />}
      </div>
    </div>
  )
}
