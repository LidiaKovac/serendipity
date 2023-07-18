import { FormEvent, useState } from "react"
import style from "./Signin.module.scss"
import { formDataToJson } from "../../utils"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button/Button"
export const Signin = () => {
  const [err, setErr] = useState<string | null>(null)
  const navigate = useNavigate()
  const login = (ev: FormEvent) => {
    ev.preventDefault()
    setErr(null)
    const fd = new FormData(ev.target as HTMLFormElement)
    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(formDataToJson(fd)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((user: Auth) => {
        localStorage.setItem("serendipity-user", JSON.stringify(user))
        if (user.user) navigate("/courses")
        else throw "La password e' sbagliata"
      })
      .catch((err: string) => {
        setErr(err)
      })
  }
  return (
    <div className={style["signin__wrap"]}>
      <form onSubmit={login}>
        <h1>Bentornat*! 👋</h1>
        <input type="email" required placeholder="Email" name="email" />
        <input
          type="password"
          required
          placeholder="Password"
          name="password"
        />
        <Button content="Login" />
        {err && <div>{err}</div>}
      </form>
    </div>
  )
}
