import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
const initialState: { courses: Course[] } = {
  courses: [] as Course[]
}

export const getCourses = createAsyncThunk("favs/getCourses", (_: null, { rejectWithValue }): Promise<Course[]> => {
  return new Promise((res, rej) => {
    fetch(`${import.meta.env.VITE_API_URL as string}courses/`, {
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







const alertSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // builder.addCase(toggleFavs.fulfilled, (state,action) => {
    //   state.favs = action.payload
    // })
    builder.addCase(getCourses.fulfilled, (state,action)=> {
      state.courses = action.payload
    })
  }
})
// export const {  } = alertSlice.actions
export default alertSlice.reducer
