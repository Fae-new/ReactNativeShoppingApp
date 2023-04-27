import { useContext } from "react"
import AuthContext from "../api/auth/context"

 
 
 
 const useAuthContext=()=>{
const {user,setUser} =useContext(AuthContext)

if(user && setUser) {return {user,setUser}}

 }


 export default useAuthContext