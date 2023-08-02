import { Card } from "../../components/Card/Card"
import { useEffect, useState } from "react"

import style from "./Courses.module.scss"
import { useNavigate } from "react-router-dom"
import { Selected } from "../../components/Selected/Selected"
import { AlertList } from "../../components/Alert/AlertList/AlertList"
export const Courses = () => {
  const [err, setErr] = useState<IError[]>([])

  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [selected, setSelected] = useState<Course | null>(null)
  const [isModalOpen, setOpenModal] = useState<boolean>(true)
  useEffect(() => {
    const ls = localStorage.getItem("serendipity-token")! as string | null
    console.log(ls)
    if (!ls) {
      navigate("/login")
    }
    fetch("https://serendipity.cyclic.cloud/courses", {
      headers: {
        "authorization": `Bearer ${localStorage.getItem("serendipity-token")!}`
      }
    })
      .then((res) => res.json())
      .then((crs) => setCourses(crs as Course[]))
      .catch((err) => {
        setErr(prev => ([...prev, {
          status: "danger",
          text: "C'e' stato un errore.",
          id: `danger_${prev.length}`
        }]))

      })
  }, [])
  const filterError = (id: string) => {
    setErr(prev => prev.filter(el => el.id !== id))
  }
  return (

    <div className={style["courses__wrap"]}>
      <AlertList errors={err} filterError={filterError} />

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
        {selected && <Selected isModalOpen={isModalOpen} setOpenModal={setOpenModal} updateFavs={() => { return }} selected={selected} />}
      </div>
    </div>
  )
}
