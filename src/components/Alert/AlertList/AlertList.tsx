import { Alert } from "../Alert"
import styles from "../Alert.module.scss"

export const AlertList = ({ errors, filterError }: { errors: IError[], filterError: (id: string) => void }) => {

    return <div className={styles["alert__list"]}>

        {(errors && errors.length > 0) && errors.map((er: IError) => <Alert key={er.id} filterError={filterError} err={er} />)}
    </div>

}