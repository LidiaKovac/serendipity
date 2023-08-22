import { useEffect, useState, useContext } from "react"
import { VscChromeClose } from "react-icons/vsc"
import { BsEmojiNeutral, BsEmojiSmile, BsEmojiFrown, BsFillLightningChargeFill } from "react-icons/bs"
import styles from "./Alert.module.scss"
import { useAppDispatch } from "../../redux"
import { removeAlert } from "../../redux/slices/alertSlice"
export const Alert = ({ err }: { err: IError }) => {
    const dispatch = useAppDispatch()
    const [icon, setIcon] = useState(<BsEmojiSmile />)
    useEffect(() => {
        switch (err.status) {
            case "success":
                setIcon(<BsEmojiSmile />)
                break;
            case "danger":
                setIcon(<BsEmojiFrown />)
                break;
            case "warning":
                setIcon(<BsEmojiNeutral />)
                break;
            case "info":
                setIcon(<BsFillLightningChargeFill />)
                break;
            default:
                break;
        }
    }, [err.status])
    useEffect(()=> {
        setTimeout(()=> {
            dispatch(removeAlert(err.id!))
        }, 5000)
    }, [])
    return (
        <div className={styles[`alert--${err.status}`]}>
            {icon} {err.text}
            <span
                onClick={() => {
                    dispatch(removeAlert(err.id!))
                }}
            >
                <VscChromeClose className={styles['alert__close']} />
            </span>
        </div>
    )
}
