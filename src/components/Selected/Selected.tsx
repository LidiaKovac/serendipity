import style from "./Selected.module.scss"
import { IoIosSpeedometer } from "react-icons/io"
import { HiOutlineClock } from "react-icons/hi"
import { FaPlay } from "react-icons/fa"
import { BsFillCalendarWeekFill, BsFillBookmarkFill, BsBookmarkXFill } from "react-icons/bs"
import { Modal } from "../../components/Modal/Modal"
import { addAlert } from "../../redux/slices/alertSlice"
import { useAppDispatch } from "../../redux"
import { toggleFavs } from "../../redux/slices/favsSlice"


interface Props {
    selected: Course,
    isFav: boolean
    isModalOpen: boolean
    setOpenModal: (status: boolean) => void
}
export const Selected = ({ selected, isFav, isModalOpen, setOpenModal  }: Props) => {
    // const [rawFavs, setRawFavs] = useState<Fav[]>([])
    const dispatch = useAppDispatch()



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
                    <button onClick={() => { void dispatch(toggleFavs(selected._id)) }}>
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
                removeFav={() => { void dispatch(toggleFavs(selected._id)) }}
                addToFav={() => { void dispatch(toggleFavs(selected._id)) }}
            />
        )
        }
    </>)

}