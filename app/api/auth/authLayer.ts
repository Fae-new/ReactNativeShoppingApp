import { createUserWithEmailAndPassword, AuthError ,signInWithEmailAndPassword} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth,db } from "../../config/firebase";
import { UserObject } from "./context";
import authStorage from "./authStorage";




  export type AuthInfoType = {
    name?:string
    email: string;
    password: string;
  };


const authenticate= async(type:'login'|'register',authInfo:AuthInfoType,setError: React.Dispatch<React.SetStateAction<{
  errorText: string;
  visible: boolean;
}>>,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setUser:React.Dispatch<UserObject | undefined> | undefined)=>{

  try {
      setError({ visible: false, errorText:''})
      setLoading(true)
if (type==='login'){

  const response =  await signInWithEmailAndPassword(
    auth,
    authInfo.email,
    authInfo.password
  )
 
  const user = response.user;
  const docRef = doc(db, "usernames", user.uid);
  const   docSnap=await getDoc(docRef)
 

  authStorage.storeUserObject({userName:docSnap.data()?.username,email:user.email,uid:user.uid,numberOfListings:docSnap.data()?.numberOfListings})
  if(setUser) setUser({userName:docSnap.data()?.username,email:user.email,uid:user.uid,numberOfListings:docSnap.data()?.numberOfListings})

}
else{
  const usernamesCollectionRef = collection(db, "usernames");
  const response=await createUserWithEmailAndPassword( auth,
     authInfo.email,
     authInfo.password)
     const user = response.user;
    await setDoc(doc(usernamesCollectionRef,user.uid),{uid:user.uid,username:authInfo.name,numberOfListings:0})
     authStorage.storeUserObject({email:user.email,uid:user.uid,userName:authInfo.name,numberOfListings:0})
 
     if(setUser) setUser({email:user.email,uid:user.uid,userName:authInfo.name,numberOfListings:0})

}



      setLoading(false)
    } catch (error: any) {
      let authError = error as AuthError;
      if (error.code) {
        setError({ visible: true, errorText: authError.message });
      } else {
        setError({ visible: true, errorText: "An Error Occurred" });
      }
setLoading(false)


    }

}



export default {authenticate}