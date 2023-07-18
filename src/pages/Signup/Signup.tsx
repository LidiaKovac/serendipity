import { FormEvent, useState } from "react"
import { Button } from "../../components/Button/Button"
import style from "./Signup.module.scss"
import { formDataToJson } from "../../utils"
import { useNavigate } from "react-router-dom"
export const Signup = () => {
  const [err, setErr] = useState<string | null>(null)
  const navigate = useNavigate()
  const submitForm = (ev: FormEvent) => {
    ev.preventDefault()
    setErr(null)
    const fd = new FormData(ev.target as HTMLFormElement)
    if (fd.get("password") !== fd.get("passwordConf")) {
      setErr("Le password sono diverse")
      return
    }
    fd.delete("passwordConf")
    fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify(formDataToJson(fd)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((user: { user: User; accessToken: string }) => {
        localStorage.setItem("serendipity-user", JSON.stringify(user))
        navigate("/courses")
      })
      .catch((err) => console.error(err))
  }
  return (
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
          name="passwordConf"
          placeholder="Conferma password"
        />
        <Button content="Registrati" />
        {err && <div>{err}</div>}
      </form>
    </div>
  )
}
