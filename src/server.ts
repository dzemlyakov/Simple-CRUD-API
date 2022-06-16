import { createServer } from "http";
import url  from "url";
import { getAllUsers, getUserById } from "./controllers/controllerUser";


export const server = createServer((req, res)=>{
console.log("🚀 ~ server ~ req", req.url)

console.log("🚀 ~ server ~ myUrl", url.parse(req.url||'http').pathname)
const urlFromRequest = req.url || ''
let urlParseArray = urlFromRequest?.split('/') 
    
    if(req.url === '/api/users' && req.method === 'GET') {
        getAllUsers(req,res)
    }
    else if(urlFromRequest.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
        const id = urlParseArray[3] 
        getUserById(req, res, id)
    } 
    else {
        res.writeHead(404,{"Content-Type": "application/json"})
        res.end(JSON.stringify({message: "Route not found"}))
    }
    
}) 

