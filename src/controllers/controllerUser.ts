import { IncomingMessage, ServerResponse } from "http";
import { findAll } from "../models/modelUser";



export const getAllUsers = async (req:IncomingMessage, res:ServerResponse)=>{
    try {
        const users = await findAll()
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(JSON.stringify(users))
    } catch (err) {
        console.log(err);
        
    }
}
