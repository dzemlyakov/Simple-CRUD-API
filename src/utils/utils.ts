import { IncomingMessage, ServerResponse } from "http"

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
export const WriteOutput = (code:number, res:ServerResponse, message:any)=>{
    res.writeHead(code,{"Content-Type": "application/json"})
    res.end(JSON.stringify(message))
}