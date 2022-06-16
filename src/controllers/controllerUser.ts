import { IncomingMessage, ServerResponse } from "http";
import { create, findAll, findById } from "../models/modelUser";
import { getBodyData } from "../utils/utils";



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
        console.log("🚀 ~ createUser ~ body", JSON.parse(body))
        

        const {name, age, hobbies} = JSON.parse(body)

        const user = {
            name, 
            age, 
            hobbies
        }
        const newUser = await create(user)
        
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(JSON.stringify(newUser))

    } catch (err) {
        console.log(err);
        
    }
}



// {
//     "name": "Kir",
//     "age": "35",
//     "hobies": ["ree","efef","efefe"]
// }