import * as SecureStore from 'expo-secure-store'

import { UserObject } from './context'
const key='authObject'

const storeUserObject= async(userObject:UserObject)=>{

    try {
        const userObjectString=JSON.stringify(userObject)
              
        await SecureStore.setItemAsync(key,userObjectString)
    
    } catch (error) {
        console.log('error storing token',error)
    }
}


const getUserObject= async()=>{

    try {             
       const userObjectString= await SecureStore.getItemAsync(key)      
      if(userObjectString) {
     
        
        return JSON.parse(userObjectString)}


      return null
    } catch (error) {
        console.log('error getting token',error)
    }
}



const removeUserObject= async()=>{

    try {             
     await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log('error deleting token',error)
    }
}

export default {getUserObject,removeUserObject,storeUserObject}
