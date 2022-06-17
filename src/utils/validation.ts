import { validate} from "uuid";

interface IUser {
    id?:string,
    name:string,
    age: number,
    hobbies: string[]|[]
}
export const isValidId = (id:string):boolean =>{
 return validate(id)
}

export const isUser = (user:IUser):boolean =>{
    const {name, age, hobbies } = user
    
    if(!name || typeof(name)!== 'string'){
        return false
    }else if(!age || typeof(age)!== 'number'){
        return false
    }else if(!hobbies || !Array.isArray(hobbies)){
        return false
    }else return true
}