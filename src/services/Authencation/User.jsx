import {db} from '../../Firebase__config'
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { set } from 'firebase/database';

const CollectionName = "User"


export const AddUserCollection = async(uid,newUser)=>{
    const {Email,firstname,lastname} = newUser;
    const initUser = {
        Email:Email,
        Address:"",
        Number:"",
        ImgUser:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/36015793570193.5e6c1151cb04b.png",
        FullName:`${firstname} ${lastname}`,
        Birthdate:"",
        Role:"user",
    }    
    return await setDoc(doc(db, CollectionName, uid), initUser)
    .then(e=>{
        return {
            success: true,
            payload:null,
        }
    })
    .catch((error) => {
        return {
            success: false,
            payload:error,
        }
    })

}

export const GetUserCollection = async(uid)=>{
    
    const docRef = doc(db, CollectionName, uid);   
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            success: true,
            payload:docSnap.data(),
        }
    } else {
        // doc.data() will be undefined in this case
        return {
            success: false,
            payload:"No such document!",
        }
    }
}

export const UpdataUserCollection = async(uid,user)=>{
    const {Email,Address,Number,ImgUser,FullName,Birthdate,Role} = user;
    
}
export const AddToCart = async(value)=>{
    const {uid,Pid,Number} = value;
    const washingtonRef = doc(db,CollectionName, uid);
    //const docRef = await doc(db, `${CollectionName}/${uid}/Cart/`);

    // add new user 
    await updateDoc(washingtonRef, {
        Cart: arrayUnion({
            Pid:Pid,
            Number:Number,
        })
    });
 
}
export const GetToCart = async(uid)=>{
    // const docRef = doc(db,CollectionName,`${uid}/Cart/`);
    const washingtonRef = doc(db,CollectionName, uid,"Cart");
    await getDoc(washingtonRef)
    .then((e)=>{
        return {
            success: true,
            payload:e,
        }
    })
    .catch(e=>{
        return {
            success: false,
            payload:e,
        }
    })
    
}
export const setNewCart = async(uid,listProduct)=>{
    
    const washingtonRef = doc(db,CollectionName, uid);
    
    // add new user 
    await updateDoc(washingtonRef, {
        Cart: listProduct
    })
    .then(()=>{
        return {
            success: true,
            payload:null,
        }
    })
    .catch(e=>{
        return {
            success: false,
            payload:e,
        }
    })
}

export const AddCartCollection = async(uid,pid,did)=>{
 const initCart = {
    items: [{
        pid, 
        Nameproduct:"",
        Quantity: "",
        Price:"",
    }],
    Total: "",
    Discount:did,
    PurchaseDate: serverTimestamp(),

 }
    return await setDoc(doc(db,"Cart",uid),initCart)
    .then(e=>{
        return {
            success: true,
            payload:null,
        }
    })
    .catch((error) => {
        return {
            success: false,
            payload:error,
        }
    })
}

export const AddToOrder = async(uid,pid)=>{
    const docRef = doc(db,CollectionName,uid);
    const colRef = collection(docRef,"Cart");
    addDoc(colRef,{
        Quantity:"",
        Item:[{
            pid,
            price:"",
        }]

    });

}

