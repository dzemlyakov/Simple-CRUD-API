import { PORT } from "./src/config/config";
import { server } from "./src/server";
server.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`);
    
})