import { useEffect, useState } from "react"
import { VscChromeClose } from "react-icons/vsc"
import { BsEmojiNeutral, BsEmojiSmile, BsEmojiFrown, BsFillLightningChargeFill } from "react-icons/bs"
import styles from "./Alert.module.scss"
export const Alert = ({err, filterError}:{err: IError, filterError: (id:string)=>void}) => {
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
                    filterError(err.id)
                }}
            >
                <VscChromeClose className={styles['alert__close']} />
            </span>
        </div>
    )
}
