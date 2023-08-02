import { Alert } from "../Alert"
import styles from "../Alert.module.scss"
import { ErrorsContext, errorsReducer } from "../../../context"
import { useContext, useReducer } from "react"

export const AlertList = () => {
    const errors = useContext(ErrorsContext)
    return <div className={styles["alert__list"]}>

        {(errors && errors.length > 0) && errors.map((er: IError) => <Alert key={er.id} err={er} />)}
    </div>

}