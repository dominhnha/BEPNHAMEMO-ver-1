import {db} from '../../Firebase__config'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, Timestamp } from "firebase/firestore";

const CollectionName = "Discount";

//Add new Discount

export const AddDiscount = async() =>{
    const CollectionRef = collection(db, CollectionName);
    const initDiscount = {
        NameDiscount:"",
        DescriptionDiscount:"",
        PercentDiscount:"",
        Exp: await Timestamp.fromDate(new Date("December 10,1900")),
        Mfg: await Timestamp.fromDate(new Date("December 10,1900")),
        Quantity:"",
    }
    return await addDoc(CollectionRef, initDiscount)
    .then(e=>{
        return{
            success: true,
            payload: initDiscount,
        }
    })
    .catch((e)=>{
        return{
            success:false,
            payload:e,
        }
    })
};

//Get discount by id
export const GetDiscountByID = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return{
            success: true,
            payload: {
                Did:did,
                Info:docSnap.data(),
            }
        }
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}