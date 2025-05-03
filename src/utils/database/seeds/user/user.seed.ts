import { Rol } from "../../../../utils/enums/rol.enum";

export const userSeeds= ()=>{
    return [
        {
            name:'admin admin',
            email:'admin@deleite.com',
            password: "12300123."
        },
        {
            name:'user user',
            email:'usern@deleite.com',
            password: "12300123."
        },
        {
            name:'invitado invitado',
            email:'invitado@deleite.com',
            password: "12300123."
        }        
    ]
}
