import style from "./Selected.module.scss"
import { IoIosSpeedometer } from "react-icons/io"
import { HiOutlineClock } from "react-icons/hi"
import { FaPlay } from "react-icons/fa"
import { BsFillCalendarWeekFill, BsFillBookmarkFill, BsBookmarkXFill } from "react-icons/bs"
import { Modal } from "../../components/Modal/Modal"
import { fetchFavs } from "../../utils/API"


interface Props {
    selected: Course,
    isFav: boolean
    isModalOpen: boolean
    updateFavs: (favs: Course[]) => void
    setOpenModal: (status: boolean) => void
}
export const Selected = ({ selected, isFav, isModalOpen, setOpenModal, updateFavs }: Props) => {
    // const [rawFavs, setRawFavs] = useState<Fav[]>([])
    const toggleFav = async (): Promise<void> => {
        try {
            const res = await fetch(`process.env.API_URLuser/favs/${selected._id}`, {
                method: "PATCH",
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("serendipity-token")!}`
                }
            })
            if (res.ok) {
                const resFavs = await fetchFavs()
                updateFavs(resFavs as Course[])
            }
        } catch (error) {
            // return error as IError
        }
    }



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
                    <button onClick={() => { void toggleFav() }}>
                        {
                            isFav ? <BsBookmarkXFill /> : <BsFillBookmarkFill />
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
                isFav={isFav}
                selected={selected}
                isOpen={isModalOpen}
                close={() => setOpenModal(false)}
                removeFav={() => { void toggleFav() }}
                addToFav={() => { void toggleFav() }}
            />
        )
        }
    </>)

}