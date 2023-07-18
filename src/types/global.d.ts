interface Course {
    title:       string;
    duration:    number;
    level:       number;
    description: string;
    img:         string;
    id:          number;
}

interface User {
    name:       string;
    lastName:   string;
    email:      string;
    password:   string;
    id:         number
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
