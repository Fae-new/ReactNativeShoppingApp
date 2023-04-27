import React,{useContext} from 'react'
import { ListingsType } from '../listingsApi2'



 export interface UserObject{
userName:string|undefined
email:string|null
uid:string
expoPushNotificationToken?:string|undefined
 }

 export type ContextObjectType={

    user:UserObject|undefined
    setUser:React.Dispatch <React.SetStateAction<UserObject|undefined>> |undefined
 }



const AuthContext=React.createContext<ContextObjectType>({user:undefined,setUser:undefined})


export default AuthContext