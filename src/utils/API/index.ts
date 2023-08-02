export const fetchMe = async () => {
    try {
        const res: Response = await fetch(`${import.meta.env.VITE_API_URL as string}user/me`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("serendipity-token")!}`
            }
        })
        if (!res.ok) return false
        else throw {
            status: "danger",
            text: "not logged in",
        } as IError

    } catch (error) {
        return error as IError
    }
}
export const fetchCourses = async () => {
    try {

        const res = await fetch(`${import.meta.env.VITE_API_URL as string}courses`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("serendipity-token")!}`
            }
        })
        if (!res.ok) {
            throw {
                status: "danger",
                text: res.statusText,
            } as IError
        }
        const crs = await res.json() as Course[]
        return crs

    } catch (error) {
        return error as IError
    }

}

export const fetchFavs = async () => {
    try {

        // const userId = getUserId()
        const res = await fetch(`${import.meta.env.VITE_API_URL as string}user/favs`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("serendipity-token")!}`
            }
        })
        if (!res.ok) {
            throw {
                status: "danger",
                text: res.statusText,
            } as IError
        }
        const rawFavList = await res.json() as Course[]
        return rawFavList
    } catch (error) {
        return error as IError
    }


}

