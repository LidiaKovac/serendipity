import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addAlert } from "./alertSlice"
const initialState: { favs: Course[] } = {
  favs: [] as Course[]
}

export const getFavs = createAsyncThunk("favs/getFavs", (_: null, { rejectWithValue }): Promise<Course[]> => {
  return new Promise((res, rej) => {
    fetch(`${import.meta.env.VITE_API_URL as string}user/favs/`, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem("serendipity-token")!}`
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw res.text()
      }

    }).then((favs: Course[]) => res(favs))
      .catch(err => {
        rej(rejectWithValue(err))
      })
  })
})



export const toggleFavs = createAsyncThunk("favs/toggleFavs", (courseId: string, { rejectWithValue, dispatch }): Promise<Course[]> => {
  return new Promise((_, rej) => {
    fetch(`${import.meta.env.VITE_API_URL as string}user/favs/${courseId}`, {
      method: "PATCH",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("serendipity-token")!}`
      }
    }).then(res => {
      console.log(res)
      if (res.ok) {
        return res.text()
      } else {
        throw res.text()
      }

    }).then(() => 
    dispatch(addAlert({
      status: "success", 
      text: "Favourites sucessfully modified."
    })))
      .then(() => {
        return dispatch(getFavs(null))
      })
      .catch(err => {
        dispatch(addAlert({
          status: "danger", 
          text: err as string
        }))
        rej(rejectWithValue(err))
      })
  })
})





const alertSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(toggleFavs.fulfilled, (state,action) => {
      state.favs = action.payload
    })
    builder.addCase(getFavs.fulfilled, (state,action)=> {
      state.favs = action.payload
    })
  }
})
// export const {  } = alertSlice.actions
export default alertSlice.reducer
