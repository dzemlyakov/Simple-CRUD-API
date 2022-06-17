import { createServer } from "http";
import url  from "url";
import { router } from "./router/router";


export const server = createServer((req, res)=>{
   router(req,res)
}) 

