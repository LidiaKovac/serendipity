import { FormEvent, useContext } from "react"
import style from "./Signin.module.scss"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { ErrorsDispatchContext } from "../../context"
export const Signin = () => {
  const dispatch = useContext(ErrorsDispatchContext)
  const navigate = useNavigate()
  const login = (ev: FormEvent) => {
    ev.preventDefault()

    const fd = new FormData(ev.target as HTMLFormElement)
    fetch("process.env.API_URLuser/login", {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        if (res.ok && res.status === 200) {
          localStorage.setItem("serendipity-token", res.headers.get("token")!)
        } else {
          throw "La password e' sbagliata"
        }
      })
      .then(() => {
        navigate("/courses")
      })
      .catch((err: string) => {
        dispatch({
          type: "add",
          status: "danger", text: err, id: `danger_${err.length}`
        })
      })
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
