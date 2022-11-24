import {db} from '../../Firebase__config'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, Timestamp, increment } from "firebase/firestore";

const CollectionName = "Discount";

//Add new Discount

export const AddDiscount = async() =>{
    const CollectionRef = collection(db, CollectionName);
    const initDiscount = {
        NameDiscount:"",
        DescriptionDiscount:"",
        PercentDiscount:"",
        Exp: await Timestamp.fromDate(new Date("December 10,2022")),
        Mfg: await Timestamp.fromDate(new Date("December 10,2022")),
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

/*
EXP: expiry date
MFG: manufacturing date
 */
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
        Quantity = await docSnap.data().Quantity;
        return Quantity;
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}
//Get exp
export const GetExp = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    let Exp = "";
    if(docSnap.exists()){
        Exp = await docSnap.data().Exp.toMillis();
        return Exp;
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}
//Get mfg
export const GetMfg = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    const docSnap = await getDoc(docRef);
    let Mfg = "";
    if(docSnap.exists()){
        Mfg = await docSnap.data().Mfg.toMillis();
        return Mfg;
        
    }
    else{
        return{
            success:false,
            payload:"No such document!",
    }
}
}
//Check discount
export const CheckDiscount = async(did) =>{
    const MFG = await GetMfg(did);
    const EXP = await GetExp(did);
    const Time = new Date();
    const now = Time.getTime();
    const quantity = await GetQuantityDiscount(did);
    let PercentDiscount = await GetPercentDiscountByID(did);
    if((now>=MFG && now<=EXP)&&quantity>0){
        return PercentDiscount;
    }
    else{
        return false;
    }
}

//-1 discount add to button pay 
export const IncrementDiscount = async(did) =>{
    const docRef = doc(db,CollectionName,did);
    await updateDoc(docRef,{
        Quantity:(await GetQuantityDiscount(did)-1).toString(),
    })
}

