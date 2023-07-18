import style from "./Selected.module.scss"
import { IoIosSpeedometer } from "react-icons/io"
import { HiOutlineClock } from "react-icons/hi"
import { FaPlay } from "react-icons/fa"
import { BsFillCalendarWeekFill, BsFillBookmarkFill, BsBookmarkXFill } from "react-icons/bs"
import { Modal } from "../../components/Modal/Modal"
import { getUserId } from "../../utils"
import { useEffect, useState } from "react"


export const Selected = ({ selected }: { selected: Course }) => {
    const [rawFavs, setRawFavs] = useState<Fav[]>([])
    const fetchFavs = async () => {
        const userId = getUserId()
        const res = await fetch(`http://localhost:3000/favourites?userId=${userId}`)
        const rawFavList = await res.json() as Fav[]
        setRawFavs(rawFavList)
    }
    useEffect(() => {
        fetchFavs().finally(() => console.log("done"))
    }, [])
    const addToFav = () => {
        fetch("http://localhost:3000/favourites", {
            method: "POST",
            body: JSON.stringify({
                courseId: selected?.id,
                userId: getUserId()
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(r => {
            fetchFavs().finally(()=> console.log("done"))
        }).catch(err => console.error(err))
    }
    const isFav = (id: number) => {
        console.log(id, rawFavs)
        return rawFavs.some(crs => crs.courseId === id)
    }
    const removeFav = () => {
        fetch(`http://localhost:3000/favourites?userId=${getUserId()}&courseId=${selected!.id}`)
            .then(res => res.json())
            .then((fav: Fav[]) => {
                console.log(fav)
                fetch(`http://localhost:3000/favourites/${fav[0].id}`, {
                    method: "DELETE"
                }).then(() => {
                    // setSelected(null)
                    fetchFavs().finally(() => console.log("done"))
                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
    }

    const [isModalOpen, setOpenModal] = useState<boolean>(true)

    return (<>
        <div className={style["courses__selected"]}>
            <div className={style["selected__header"]}>
                <img src={selected.img} alt="" />{" "}
                <div className={style["selected__commands"]}>
                    <button>
                        <FaPlay />
                    </button>
                    <button>
                        <BsFillCalendarWeekFill />
                    </button>
                    <button onClick={() => {
                        if (isFav(selected.id)) {
                            removeFav()
                        } else addToFav()
                    }}>
                        {
                            isFav(selected.id) ? <BsBookmarkXFill /> : <BsFillBookmarkFill />
                        }

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
        </div>

        {selected && (
            <Modal
                course={selected}
                isOpen={isModalOpen}
                close={() => setOpenModal(false)}
            />
        )
        }
    </>)

}