import { v4 as uuidv4 } from "uuid";
import db from "../data/db.json";

interface IUser {
    id?:string,
    name:string,
    age: number,
    hobbies: string[]|[]
}

export const findAll = () =>{
    return new Promise((resolve, reject)=>{
        resolve(db)
    })
}

export const findById = (id:string) =>{
    return new Promise<any>((resolve, reject)=>{
        const user = db.find((user:IUser)=>user.id === id)
        if(user === undefined){
            resolve(null)
        }else {
            resolve(user)
        }
        
    })
}

export const create = (user:IUser) =>{
    return new Promise((resolve, reject)=>{
       const newUser = {id:uuidv4(), ...user}
       db.push(newUser)
       resolve(newUser)
    })
}

export const update = (id:string, userData:IUser) =>{
    return new Promise((resolve, reject)=>{
        const indexOfUser = db.findIndex((user:IUser)=>user.id === id)
        if(indexOfUser === -1){
            resolve(false)
        }else {
            db[indexOfUser] = {id, ...userData}
            console.log("🚀 ~ returnnewPromise ~ userData", userData)
            
            resolve(db[indexOfUser])
        }
        
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