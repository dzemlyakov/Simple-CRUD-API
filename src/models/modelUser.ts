import { v4 as uuidv4 } from "uuid";
import { db, filterDB } from "../data/db";
import { isUser, isValidId } from "../utils/validation";

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
        if(!isValidId(id)){
            resolve('wrongId')
        }else{
            const user = db.find((user:IUser)=>user.id === id)
            if(user === undefined){
                resolve('noUser')
            }else {
                resolve(user)
            }
        } 
    })
}

export const create = (user:IUser) =>{
    return new Promise((resolve, reject)=>{
      if(!isUser(user)) {
        resolve(null)
    }else{
        const newUser = {id:uuidv4(), ...user}
        db.push(newUser)
        resolve(newUser)
    }  
    })
}

export const update = (id:string, userData:IUser) =>{
    return new Promise((resolve, reject)=>{
        if(!isUser(userData)){
            resolve('wrongField')
        }else{
            const indexOfUser = db.findIndex((user:IUser)=>user.id === id)
            if(indexOfUser === -1){
                resolve('noUser')
            }else {
                db[indexOfUser] = {id, ...userData}
                resolve(db[indexOfUser])
            }
        }
        
        
    })
}

export const remove = (id:string) =>{
    return new Promise<void>((resolve, reject) => {
        filterDB(id)
        resolve()
    })
}


