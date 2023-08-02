import { ProgressBar } from "react-loader-spinner"
import styles from "./Loader.module.scss"
export const Loader = () => {
    return <div className={styles["loader__wrap"]}>
        <ProgressBar
            height="100"
            width="100"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor='#004175'
            barColor='#ff9600'
        />
    </div>
}