import { IncomingMessage, ServerResponse } from "http"
import { validate } from "uuid";
import { isUser } from "./validation";

export const getBodyData = (req:IncomingMessage) =>{
    return  new Promise<string>((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk:Buffer)=>{
               body += chunk.toString() 
            })
            req.on('end', ()=>{
                resolve(body)
             })
        } catch (err) {
         reject(err)   
        }
    })
}

export const getUserFromBody = async (req:IncomingMessage) =>{
   try {
    const body:string = await getBodyData(req);
    const userObj = JSON.parse(body)
    if (Object.keys(userObj).length > 3) {
        return null
    } else {
        const { name, age, hobbies } = JSON.parse(body);
        const user = { name, age, hobbies };
        return user
    }
   } catch (err) {
    
   }
}

export const writeOutput = (code:number, res:ServerResponse, message:any)=>{
    res.writeHead(code,{"Content-Type": "application/json"})
    res.end(JSON.stringify(message))
}