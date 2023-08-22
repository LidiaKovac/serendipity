import { RootState, useAppSelector } from "../../../redux"
import { Alert } from "../Alert"
import styles from "../Alert.module.scss"

export const AlertList = () => {
    const errors:IError[] = useAppSelector((state:RootState) => state.alerts.alerts)
    return <div className={styles["alert__list"]}>

        {(errors && errors.length > 0) && errors.map((er: IError) => <Alert key={er.id} err={er} />)}
    </div>

}