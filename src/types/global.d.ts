interface Course {
    title:       string;
    duration:    number;
    level:       number;
    description: string;
    img:         string;
    _id:         string;
}

interface User {
    name:       string;
    lastName:   string;
    email:      string;
    password:   string;
    _id:        string
}

interface Auth {
    user:       User
    accessToken:string 
}



interface IError {
    status: "success" | "danger" | "warning" | "info",
    text: string
    id?: string
}

type ErrorActionTypes = 'add' | 'remove'
interface ErrorAction extends IError {
    type: ErrorActionTypes
}