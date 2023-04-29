import React,{createContext,useState} from 'react'


export interface UserObject{
userName:string|undefined
email:string|null
uid:string
expoPushNotificationToken?:string|undefined
numberOfListings:number
 }



 
 export type ContextObjectType={
   user:UserObject|undefined
   setUser:React.Dispatch <React.SetStateAction<UserObject|undefined>>
}

 const AuthContext=createContext<ContextObjectType|undefined>(undefined)










export default AuthContext