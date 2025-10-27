import jwt from "jsonwebtoken";
const secret ="otash2002"


const playload = {
    id:12,
    name:"Otabek",
    role:"Student",
    staFid:22233,
}

const token = jwt.sign(playload,secret0)
console.log(token)