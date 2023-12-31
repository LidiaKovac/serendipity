import { FormEvent } from "react"
import { Button } from "../../components/Button/Button"
import style from "./Signup.module.scss"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux"
import { addAlert } from "../../redux/slices/alertSlice"
export const Signup = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const submitForm = (ev: FormEvent) => {
    ev.preventDefault()

    const fd = new FormData(ev.target as HTMLFormElement)
    if (fd.get("password") !== fd.get("passwordConfirm")) {
      dispatch(addAlert({
        status: "danger", text: "Le password non corrispondono"
      }))

      return
    }
    // fd.delete("passwordConfirm")
    fetch(`${import.meta.env.VITE_API_URL as string}user`, {
      method: "POST",
      body: fd,
    })
      .then((res) => res.text())
      .then(() => {
        // localStorage.setItem("serendipity-user", JSON.stringify(user))
        navigate("/login")
      })
      .catch((err: IError) => {
        console.log(err)
        dispatch(addAlert({
          status: "danger", text: err.text
        }))
      })
  }

  return (
    <>
      <div className={style["signup__wrap"]}>
        <form onSubmit={submitForm}>
          <h1>Ciao! 👋</h1>
          <label htmlFor="name">
            Come possiamo chiamarti?
            <br /> P.S. Non serve sia il nome dei documenti, qui sei liber*!{" "}
          </label>
          <div className={style["form-line__name"]}>
            <input
              required
              type="text"
              placeholder="Nome"
              name="name"
              id="name"
            />
            <input required placeholder="Cognome" type="text" name="lastName" />
          </div>
          <label htmlFor="email">
            Ora ci servono solo la tua migliore email (anche una imbarazzante!) e
            una password a prova di hacker!
          </label>
          <input
            required
            type="email"
            placeholder="hello@email.com"
            name="email"
            id="email"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            required
            type="password"
            name="passwordConfirm"
            placeholder="Conferma password"
          />
          <Button content="Registrati" />
        </form>
      </div></>
  )
}
