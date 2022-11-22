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


//Discount 10% product
export const Discount10 = async(pid)=>{
    const initDiscount10={
        NameDiscount:"Discount 10% Product",
        PercentDiscount:"10%",
    }
    return await setDoc(doc(db,"Discount 10% Product",pid),initDiscount10)
}


//Discount 20% product
export const Discount20 = async(pid)=>{
    const initDiscount20={
        NameDiscount:"Discount 20% Product",
        PercentDiscount:"10%",
    }
    return await setDoc(doc(db,"Discount 20% Product",pid),initDiscount20)
}
//Discount 30% product
export const Discount30 = async(pid)=>{
    const initDiscount30={
        NameDiscount:"Discount 30% Product",
        PercentDiscount:"30%",
    }
    return await setDoc(doc(db,"Discount 30% Product",pid),initDiscount30)
}
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
//Get PercentDiscount by id
export const GetPercentDiscountByID = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    let PercentDiscount = "";
    if(docSnap.exists()){
        PercentDiscount = await docSnap.data().PercentDiscount;
        return PercentDiscount;
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}

//Get quantity discount
export const GetQuantityDiscount = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    let Quantity = "";
    if(docSnap.exists()){
        Quantity = await docSnap.data().PercentDiscount;
        return Quantity;
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}

