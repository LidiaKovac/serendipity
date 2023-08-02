import { useEffect, useState, useContext } from "react"
import { VscChromeClose } from "react-icons/vsc"
import { BsEmojiNeutral, BsEmojiSmile, BsEmojiFrown, BsFillLightningChargeFill } from "react-icons/bs"
import { ErrorsDispatchContext } from "../../context"
import styles from "./Alert.module.scss"
export const Alert = ({ err }: { err: IError }) => {
    const dispatch = useContext(ErrorsDispatchContext)
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

    return (
        <div className={styles[`alert--${err.status}`]}>
            {icon} {err.text}
            <span
                onClick={() => {
                    dispatch({
                        type: "remove",
                        ...err
                    })
                }}
            >
                <VscChromeClose className={styles['alert__close']} />
            </span>
        </div>
    )
}
