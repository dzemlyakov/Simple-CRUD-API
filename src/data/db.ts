export let db:any = [
     
]
interface IUser {
    id?:string,
    name:string,
    age: number,
    hobbies: string[]|[]
}

export const filterDB = (id:string) =>{
    db = db.filter((user:IUser)=>user.id !== id)
    return db
} 