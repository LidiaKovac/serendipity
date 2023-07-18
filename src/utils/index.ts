export const formDataToJson = (fd: FormData) => {
    const obj = {} as { [key: string]: any }
    fd.forEach((val, key) => {
        obj[key] = val
    })
    return obj
}

export const getUserId = (): number => {
    const ls = JSON.parse(localStorage.getItem("serendipity-user") as string) as Auth
    return ls.user.id
}

