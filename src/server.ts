import { createServer } from "http";
import { ErrorHandler } from "./errors/errorHandler";
import { router } from "./router/router";


export const server = createServer((req, res)=>{
  try {
      router(req,res)
  } catch (error:any) {
   ErrorHandler( error, res)
  }
}) 

