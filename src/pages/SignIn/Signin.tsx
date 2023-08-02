import { FormEvent, useState } from "react"
import style from "./Signin.module.scss"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { AlertList } from "../../components/Alert/AlertList/AlertList"
export const Signin = () => {
  const [err, setErr] = useState<IError[]>([])
  const navigate = useNavigate()
  const login = (ev: FormEvent) => {
    ev.preventDefault()
    setErr([])
    const fd = new FormData(ev.target as HTMLFormElement)
    fetch("https://serendipity.cyclic.cloud/user/login", {
      method: "POST",
      body: fd,

    })
      .then((res) => {
        if (res.ok && res.status === 200) {
          localStorage.setItem("serendipity-token", res.headers.get("token")!)
        } else {
          throw "La password e' sbagliata"

        }
        // return res.text()
      })
      .then(() => {
        navigate("/courses")
      })
      .catch((err: string) => {
        setErr(prev => ([...prev, { status: "danger", text: err, id: `danger_${err.length}` }]))
      })
  }
  const filterError = (id: string) => {
    setErr(prev => prev.filter(el => el.id !== id))
  }
  return (
    <>
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
        </form>
      </div>
    </>
  )
}
