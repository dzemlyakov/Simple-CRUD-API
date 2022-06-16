import { IncomingMessage } from "http"

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