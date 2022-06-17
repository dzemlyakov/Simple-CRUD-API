import { createServer } from "http";
import url  from "url";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "./controllers/controllerUser";


export const server = createServer((req, res)=>{
console.log("🚀 ~ server ~ req", req.url)

console.log("🚀 ~ server ~ myUrl", url.parse(req.url||'http').pathname)
const urlFromRequest = req.url || ''
let urlParseArray = urlFromRequest?.split('/') 
const id = urlParseArray[3]
    
    if(req.url === '/api/users' && req.method === 'GET') {
        getAllUsers(req,res)
    }
    else if(urlFromRequest.match(/\/api\/users\/\w+/) && req.method === 'GET'){ 
        getUserById(req, res, id)
    } else if(req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res)
    }else if(urlFromRequest.match(/\/api\/users\/\w+/) && req.method === 'PUT'){ 
         updateUser(req,res,id)    
        }
    else if(urlFromRequest.match(/\/api\/users\/\w+/) && req.method === 'DELETE'){ 
            deleteUser(req,res,id)    
           }
    else {
        res.writeHead(404,{"Content-Type": "application/json"})
        res.end(JSON.stringify({message: "Route not found"}))
    }
    
}) 

