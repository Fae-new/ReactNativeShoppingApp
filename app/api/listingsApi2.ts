import { uploadBytesResumable,ref,getDownloadURL } from "firebase/storage"
import { addDoc,collection ,getDocs,doc,updateDoc} from "firebase/firestore"



import { storage } from "../config/firebase"
import { FormValuesType } from "../screens/AddListingScreen"
import { db } from "../config/firebase"
import { ContextObjectType, UserObject } from "./auth/context";

export type ListingsType = {
  docId: string;
  id: number;
  title: string;
  imagesUrl: string[];
  price: number;
  categoryId: number;
user:UserObject
  imageDownloadUrl:string
  description:string
  numberOfListings?:number|undefined
}[];



const addListing= async (values:FormValuesType,onUploadProgress: React.Dispatch<React.SetStateAction<number>>,authContext:ContextObjectType|undefined)=>{

    try {
    await uploadImage(values,onUploadProgress)  
await uploadDetails(values,authContext)    
    } catch (error) {
     console.log(error) 
    }
        
    }


    
const uploadImage=async (values:FormValuesType,onUploadProgress: React.Dispatch<React.SetStateAction<number>>)=>{ 
  
  for await(let image of values.images){
 
    const storageRef = ref(storage, `listingImages/${image.height+''+image.uri}.jpg`)  
    
      
        const response = await fetch(image.uri)
        const blobFile = await response.blob()  
        const result = uploadBytesResumable(storageRef, blobFile)

       result.on('state_changed',(snapshot)=>{
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) ;
  onUploadProgress(progress)
       })
      }
  


  }

  const uploadDetails=async(values:FormValuesType,authContext:ContextObjectType|undefined)=>{

if(authContext?.setUser&&authContext.user)authContext?.setUser({...authContext.user,numberOfListings:authContext.user.numberOfListings+1})

try {
    
    const imagesUriArray:string[]=[]
    
        for await (let image of values.images){
        
        image.assetId?imagesUriArray.push( image.assetId):imagesUriArray.push(image.height+image.uri)
    
        }
        const usernamesCollectionRef = collection(db, "usernames");
       await updateDoc(doc(usernamesCollectionRef,authContext?.user?.uid),{numberOfListings:authContext?.user?.numberOfListings as number +1})
          await addDoc(collection(db, "listings"), {
            title: values.title,
            price: values.price,
            imagesUrl:imagesUriArray,
            categoryId:values.category?values.category:9,
            user:authContext?.user
            
          });

} catch (error) {
    console.log(error)
    
}

    
  }


  const getListings = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>,setError:React.Dispatch<React.SetStateAction<boolean>>,setData: React.Dispatch<React.SetStateAction<ListingsType | undefined>>) => {
    const listingsCollectionref = collection(db, "listings");

    setLoading(true);
    setError(false)


    try {
     
      const data = await getDocs(listingsCollectionref);

      const listingsApi = data.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      })) as ListingsType

      
      for await (let listing of listingsApi) {
    const imageRef = ref(
        storage,
        `listingImages/${listing.imagesUrl[0]}.jpg`
      );

      listing.imageDownloadUrl = await getDownloadURL(imageRef)
      
      }
// // cache.store('listings',listingsApi)
// cache.deleteAll()
      setData(listingsApi);
      setLoading(false);
      setError(false);
    } catch (error) {
      if (error) {
        console.log(error)
        setError(true);
        setLoading(false);
      }
    }
  };


  export default {addListing,getListings}