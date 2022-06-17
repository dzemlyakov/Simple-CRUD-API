import { IncomingMessage, ServerResponse } from "http";
import { create, findAll, findById, remove, update } from "../models/modelUser";
import { getBodyData } from "../utils/utils";

interface IUser {
    id?:string,
    name:string,
    age: number,
    hobbies: string[]|[]
}

export const getAllUsers = async (req:IncomingMessage, res:ServerResponse)=>{
    try {
        const users = await findAll()
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(JSON.stringify(users))
    } catch (err) {
        console.log(err);
        
    }
}

export const getUserById = async (req:IncomingMessage, res:ServerResponse, id:string)=>{
    try {
        const user = await findById(id)
        if (!user){
            res.writeHead(404,{"Content-Type": "application/json"})
            res.end(JSON.stringify({message: " User not found"}))
        }else{
            res.writeHead(200,{"Content-Type": "application/json"})
            res.end(JSON.stringify(user))
        }
       
    } catch (err) {
        console.log(err);
        
    }
}

export const createUser = async (req:IncomingMessage, res:ServerResponse)=>{
    try {
        const body:string = await getBodyData(req)
        
        const {name, age, hobbies} = JSON.parse(body)
        const user = { name, age, hobbies }
        
        const newUser = await create(user)
        
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(JSON.stringify(newUser))

    } catch (err) {
        console.log(err);
        
    }
}

export const updateUser = async (req:IncomingMessage, res:ServerResponse,id:string)=>{
    try {
        const user = await findById(id)

        if (!user){
            res.writeHead(404,{"Content-Type": "application/json"})
            res.end(JSON.stringify({message: "User not found"}))
        }else {
            const body:string = await getBodyData(req)
            const {name, age, hobbies} = JSON.parse(body)
            
            const newInfoAboutUser:IUser = {
                name: name||user.name,
                age: age || user.age,
                hobbies: hobbies || user.hobbies
            }
           
            const updatedUser = await update(id, newInfoAboutUser)
            res.writeHead(200,{"Content-Type": "application/json"})
            res.end(JSON.stringify(updatedUser))
        }
    } catch (err) {
        console.log(err);
        
    }
}

export const deleteUser = async (req:IncomingMessage, res:ServerResponse, id:string)=>{
    try {
        const user = await findById(id)
        if (!user){
            res.writeHead(404,{"Content-Type": "application/json"})
            res.end(JSON.stringify({message: " User not found"}))
        }else{
            await remove(id)
            res.writeHead(200,{"Content-Type": "application/json"})
            res.end(JSON.stringify({message: `User ${id} has been removed`}))
        }
       
    } catch (err) {
        console.log(err);
        
    }
}

// {
//     "name": "Kir",
//     "age": "35",
//     "hobbies": ["ree","efef","efefe"]
// }

