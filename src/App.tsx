import { useReducer, Suspense } from 'react'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import { Loader } from './pages/Loader/Loader'
import { Layout } from './pages/RouterLayout/RouterLayout'
import { fetchCourses, fetchFavs, fetchMe } from './utils/API/index.ts'
import { Provider } from 'react-redux'
import { store } from './redux/index.ts'


function App() {
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
          loader: async () => {
            try {

              const favs = await fetchFavs()
              return favs


            } catch (error) {
              console.log(error)
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


        <Suspense fallback={<Loader />}>
          <Provider store={store}>
          <RouterProvider fallbackElement={<Loader />} router={router} />
          </Provider>
        </Suspense>

  )
}

export default App
