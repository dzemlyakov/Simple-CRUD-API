interface IUser {
    id?:string,
    name:string,
    age: number,
    hobbies: string[]|[]
}

export let db:IUser[] = []

export const filterDB = (id:string) =>{
    db = db.filter((user:IUser)=>user.id !== id)
    return db
} 