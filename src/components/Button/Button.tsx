import style from "./Button.module.scss"
interface Props {
    content: string
    action?: () => void
}
export const Button = ({ content, action }: Props) => {
    return (
        <button onClick={action} className={style["btn"]}>
            {content}
        </button>
    )

}