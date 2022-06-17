export let db = [
     {
        "id": "21c1f0f9-16b5-40b1-b56a-ea38e4e66093",
        "name": "Nick",
        "age": 23,
        "hobbies": ["travel", "dance", "series"]
    },
    {
        "id": "4d1546c5-9f05-401c-8a51-08b3ce509f8b",
        "name": "Vasy",
        "age": 30,
        "hobbies": ["reading", "dance", "movies"]
    },
    {
        "id": "918d389a-3ccb-4c70-bd86-1130eec3baca",
        "name": "Alia",
        "age": 56,
        "hobbies": ["programming", "painting", "theater"]
    },
    {
        "id": "d5856456-525b-4079-b648-5f979ebc1b38",
        "name": "Stan",
        "age": 48,
        "hobbies": []
    }
]


export const filterDB = (id:string) =>{
    db = db.filter((user)=>user.id !== id)
    return db
} 