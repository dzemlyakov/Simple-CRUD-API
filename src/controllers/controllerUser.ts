import { IncomingMessage, ServerResponse } from "http";
import { findAll, findById } from "../models/modelUser";



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
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(JSON.stringify(user))
    } catch (err) {
        console.log(err);
        
    }
}