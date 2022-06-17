export let db = [
     {
        "id": "1",
        "name": "Nick",
        "age": 23,
        "hobbies": ["travel", "dance", "series"]
    },
    {
        "id": "2",
        "name": "Vasy",
        "age": 30,
        "hobbies": ["reading", "dance", "movies"]
    },
    {
        "id": "3",
        "name": "Alia",
        "age": 56,
        "hobbies": ["programming", "painting", "theater"]
    },
    {
        "id": "4",
        "name": "Stan",
        "age": 48,
        "hobbies": []
    }
]


export const filterDB = (id:string) =>{
    db = db.filter((user)=>user.id !== id)
    return db
} 