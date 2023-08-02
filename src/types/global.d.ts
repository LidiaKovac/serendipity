interface Course {
    title:       string;
    duration:    number;
    level:       number;
    description: string;
    img:         string;
    _id:          number;
}

interface User {
    name:       string;
    lastName:   string;
    email:      string;
    password:   string;
    _id:         number
}

interface Auth {
    user:       User
    accessToken:string 
}

interface Fav {
    courseId:   number 
    id:         number 
    userId:     number
}


interface IError {
    status: "success" | "danger" | "warning" | "info",
    text: string
    id: string
}