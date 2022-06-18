import { IncomingMessage, ServerResponse } from "http";
import { ErrorHandler } from "../errors/errorHandler";
import { EXTRA_FIELDS, INVALID_USER, NOT_FOUND, REQUIRED_FIELDS, WAS_REMOVED } from "../errors/errors";
import { create, findAll, findById, remove, update } from "../models/modelUser";
import { getBodyData, getUserFromBody, writeOutput } from "../utils/utils";

interface IUser {
  id?: string;
  name: string;
  age: number;
  hobbies: string[] | [];
}

export const getAllUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await findAll();
    writeOutput(200, res, users);
  } catch (err:any) {
    ErrorHandler(err, res)
  }
};

export const getUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await findById(id);
    if (user === 'wrongId') {
      writeOutput(400, res, INVALID_USER);
    }else if(user === 'noUser'){
        writeOutput(404, res, NOT_FOUND);
    } else {
      writeOutput(200, res, user);
    }
  } catch (err:any) {
    ErrorHandler(err, res)
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const user = await getUserFromBody(req);
    
    if(!user) {
        writeOutput(400, res, EXTRA_FIELDS)
    } else {
        const newUser = await create(user);
        console.log("🚀 ~ createUser ~ newUser", newUser)
        if (!newUser) {
            writeOutput(400, res, REQUIRED_FIELDS)
        } else {
            writeOutput(201, res, newUser);
        }
    }
  
    } catch (err:any) {
        ErrorHandler(err, res)
  }
};
export const updateUser = async (req: IncomingMessage, res: ServerResponse, id:string) => {
  try {
    const user = await getUserFromBody(req);
    
    if(!user) {
        writeOutput(400, res, EXTRA_FIELDS)
    } else {
        const updatedUser = await update(id, user);
        console.log("🚀 ~ createUser ~ newUser", updatedUser)
        if(updatedUser === 'wrongField'){
          writeOutput(400, res, REQUIRED_FIELDS)
      }else if(updatedUser === 'noUser'){
          writeOutput(404, res, NOT_FOUND)
      }else{
          writeOutput(200, res, updatedUser);
      }
    }
    } catch (err:any) {
        ErrorHandler(err, res)
  }
};

export const updateUserField = async (req: IncomingMessage, res: ServerResponse, id: string ) => {
  try {
    const user = await findById(id);
    if (user === 'wrongId') {
        writeOutput(400, res, INVALID_USER);
      }else if(user === 'noUser'){
          writeOutput(404, res, NOT_FOUND);
      } else {
      const userFromBody = await getUserFromBody(req);
      if (!userFromBody) {
        writeOutput(400, res, EXTRA_FIELDS)
      } else {
        const newInfoAboutUser: IUser = {
            name: userFromBody.name || user.name,
            age: userFromBody.age || user.age,
            hobbies: userFromBody.hobbies || user.hobbies,
          };
          const updatedUser = await update(id, newInfoAboutUser);
          
            if(updatedUser === 'wrongField'){
                writeOutput(400, res, REQUIRED_FIELDS)
            }else if(updatedUser === 'noUser'){
                writeOutput(404, res, NOT_FOUND)
            }else{
                writeOutput(200, res, updatedUser);
            }
      }
    }
  } catch (err:any) {
    ErrorHandler(err, res)
  }
};

export const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await findById(id);
    if (user === 'wrongId') {
        writeOutput(400, res, INVALID_USER);
      }else if(user === 'noUser'){
          writeOutput(404, res, NOT_FOUND);
      } else {
            await remove(id);
            writeOutput(204, res, WAS_REMOVED);
    }
  } catch (err:any) {
    ErrorHandler(err, res)
  }
};

// {
//     "name": "Kir",
//     "age": "35",
//     "hobbies": ["ree","efef","efefe"]
// }
