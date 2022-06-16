import db from "../data/db.json";

export const findAll = () =>{
    return new Promise((resolve, reject)=>{
        resolve(db)
    })
}












// import { v4 as uuidv4 } from "uuid";

// interface IUser {
//     id:string,
//     name:string,
//     age: number,
//     hobbies: string[]|[]
// }
// export const user:IUser = {
//     id: uuidv4(),
//     name: "ff",
//     age: 23,
//     hobbies: []

// }