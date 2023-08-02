import { useReducer, Suspense } from 'react'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import { ErrorsContext, ErrorsDispatchContext, errorsReducer } from './context'
import { Loader } from './pages/Loader/Loader'
import { Layout } from './pages/RouterLayout/RouterLayout'
import { fetchCourses, fetchFavs, fetchMe } from './utils/API/index.ts'


function App() {
  const [errors, dispatch] = useReducer(errorsReducer, [])
  const router = createBrowserRouter([
    {
      errorElement: <Loader />,
      path: "/",
      Component: Layout,
      children: [
        {
          errorElement: <Loader />,
          path: "/",
          lazy: async () => {
            const { Homepage } = await import("./pages/Homepage/Homepage.tsx")
            return { Component: Homepage }
          }
        },
        {
          errorElement: <Loader />,
          loader: async () => {
            try {
              await fetchMe()
              const courses = await fetchCourses() as Course[]
              const favs = await fetchFavs() as Course[]
              return { courses, favs } as { courses: Course[], favs: Course[] }
            } catch (error) {
              if ((error as IError).text === "not logged in") redirect("/login")
              dispatch({
                type: "add",
                ...error as IError,
              } as ErrorAction)
            }
          },
          path: "/courses",
          lazy: async () => {
            const { Courses } = await import("./pages/Courses/Courses.tsx")
            return { Component: Courses }
          }
        },
        {
          errorElement: <Loader />,
          path: "/signup",
          lazy: async () => {
            const { Signup } = await import("./pages/Signup/Signup.tsx")
            return { Component: Signup }
          }
        },
        {
          errorElement: <Loader />,
          path: "/login",
          lazy: async () => {
            const { Signin } = await import("./pages/SignIn/Signin.tsx")
            return { Component: Signin }
          }
        },
        {
          loader:async () => {
            try {
              
              const favs = await fetchFavs()
              return favs
              
              
            } catch (error) {              
              dispatch({
                type: "add",
                status: (error as IError).status,
                text: (error as IError).text
              } as ErrorAction)
            }
          },
          errorElement: <Loader />,
          path: "/favs",
          lazy: async () => {
            const { Favourites } = await import("./pages/Favorites/Favorites.tsx")
            return { Component: Favourites }
          }
        },

      ]
    },
  ])
  return (
    <ErrorsContext.Provider value={errors}>
      <ErrorsDispatchContext.Provider value={dispatch}>

        <Suspense fallback={<Loader />}>
          <RouterProvider fallbackElement={<Loader />} router={router} />
        </Suspense>
      </ErrorsDispatchContext.Provider>
    </ErrorsContext.Provider>
  )
}

export default App
