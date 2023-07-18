import { Card } from "../../components/Card/Card"
import { useEffect, useState } from "react"

import style from "./Courses.module.scss"
import { useNavigate } from "react-router-dom"
import { getUserId } from "../../utils"
import { Selected } from "../../components/Selected/Selected"
export const Courses = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [selected, setSelected] = useState<Course | null>(null)
  const [isModalOpen, setOpenModal] = useState<boolean>(true)
  useEffect(() => {
    const ls = JSON.parse(
      localStorage.getItem("serendipity-user")!
    ) as User | null
    console.log(ls)
    if (!ls) {
      navigate("/signup")
    }
    fetch("http://localhost:3000/courses")
      .then((res) => res.json())
      .then((crs) => setCourses(crs as Course[]))
      .catch((err) => console.error(err))
  }, [])
  return (
    <div className={style["courses__wrap"]}>
      <h1>Percorsi</h1>
      <div className={style["courses__content"]}>
        <div className={style["courses__list"]}>
          {courses.map((crs) => (
            <Card
              isSel={crs.id === selected?.id}
              setSelected={(data: Course) => {
                setSelected(data)
                setOpenModal(true)
              }}
              course={crs}
            />
          ))}
        </div>
          {selected &&  <Selected selected={selected}/>} 
    </div>
    </div>
  )
}
