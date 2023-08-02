import { FormEvent, useContext, useReducer } from "react"
import { Button } from "../../components/Button/Button"
import style from "./Signup.module.scss"
import { useNavigate } from "react-router-dom"
import { ErrorsDispatchContext, errorsReducer } from "../../context"
export const Signup = () => {
  const dispatch = useContext(ErrorsDispatchContext)
  const navigate = useNavigate()
  const submitForm = (ev: FormEvent) => {
    ev.preventDefault()

    const fd = new FormData(ev.target as HTMLFormElement)
    if (fd.get("password") !== fd.get("passwordConfirm")) {
      dispatch({
        type: "add",
        status: "danger",
        text: "Le password sono diverse!",
      })

      return
    }
    // fd.delete("passwordConfirm")
    fetch("https://serendipity.cyclic.cloud/user", {
      method: "POST",
      body: fd,
    })
      .then((res) => res.text())
      .then((_) => {
        // localStorage.setItem("serendipity-user", JSON.stringify(user))
        navigate("/login")
      })
      .catch((err: IError) => {
        console.log(err)
        dispatch({
          type: "add",
          ...err,
        })
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
