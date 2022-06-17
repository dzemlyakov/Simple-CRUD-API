import { IncomingMessage, ServerResponse } from "http";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/controllerUser";
import { NOT_FOUND } from "../errors/errors";
import { WriteOutput } from "../utils/utils";


export const router = (req:IncomingMessage,res:ServerResponse) =>{

    let urlFromRequest = req.url || ''
    const matchUrlWithId = urlFromRequest.match(/\/api\/users\/\w+/)
    const matchUrl = req.url === '/api/users'||req.url === '/api/users/'
    
    let urlParseArray = urlFromRequest?.split('/') 
    const id = urlParseArray[3]
    
    
    const method ={
        get:  req.method === 'GET',
        post: req.method === 'POST',
        put: req.method === 'PUT',
        delete: req.method === 'DELETE'
    }
        
        if(matchUrl && method.get) {
            getAllUsers(req,res)
        }
        else if(matchUrlWithId && method.get){ 
            getUserById(req, res, id)
        } else if(matchUrl && method.post) {
            createUser(req, res)
        }else if(matchUrlWithId && method.put){ 
             updateUser(req,res,id)    
            }
        else if(matchUrlWithId && method.delete){ 
                deleteUser(req,res,id)    
               }
        else {
            WriteOutput(400, res, NOT_FOUND)
        }
     
}