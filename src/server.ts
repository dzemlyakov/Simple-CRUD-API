import { createServer } from "http";
import { getAllUsers } from "./controllers/controllerUser";




export const server = createServer((req, res)=>{
console.log("🚀 ~ server ~ req", req.url)
    
    if(req.url === '/api/users' && req.method === 'GET') {
        getAllUsers(req,res)
    } else {
        res.writeHead(404,{"Content-Type": "application/json"})
        res.end(JSON.stringify({message: "Route not found"}))
    }
    
}) 

