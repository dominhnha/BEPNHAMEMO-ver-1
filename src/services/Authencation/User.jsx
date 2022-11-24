import {db} from '../../Firebase__config'
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { set } from 'firebase/database';
import {AddBestSell, GetNameProduct, GetPriceProduct, GetQuantityProduct,} from '../Product/Product'
import { GetPercentDiscountByID } from './Discount';
import { AddPurchaseHistory } from './PurchaseHistory';
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

//PurchaseHistory
export const AddPurchaseHistoryForUser = async(uid,Cart = [{pid:"",quantity:""}],did) =>{
    
    const Discount = await GetPercentDiscountByID(did);
    const docRef = doc(db, CollectionName, uid);
    const colRef = collection(docRef, "PurchaseHistoryForUser");
    const initPur = {
        Discount:Discount,
        Total:"",
        DayPurchased:serverTimestamp(),
    }
    const PurDoc = await addDoc(colRef,initPur);
    const docPurRef = doc(db, CollectionName, uid,"PurchaseHistoryForUser",PurDoc.id)
    const docSnap = await getDoc(docPurRef);
    console.log(docSnap.data().Item)
    for(let i=0;i<Cart.length;i++){
        const NameProduct = await GetNameProduct(Cart[i].pid);
        const PriceProduct = await GetPriceProduct(Cart[i].pid);
        const docRefP = doc(db,"Product",Cart[i].pid);
        const QuantityProduct = await GetQuantityProduct(Cart[i].pid);
        const initProduct = { 
                Item:[{
                Pid:Cart[i].pid,
                NameProduct:NameProduct,
                PriceProduct:PriceProduct,
                Quantity:Cart[i].quantity,   
                }]
        }
        if(QuantityProduct>=Cart[i].quantity){
            
            await updateDoc(docRefP,{
                    Quantity:(QuantityProduct-Cart[i].quantity).toString()
                                     })
            await AddBestSell(Cart[i].pid,Cart[i].quantity);
             await updateDoc(docPurRef,{
                    Item:arrayUnion({
                        Pid:Cart[i].pid,
                        NameProduct:NameProduct,
                        PriceProduct:PriceProduct,
                        Quantity:Cart[i].quantity,
                    })
                })
             
    }
    else{
        await deleteDoc(docPurRef);
        return{
            success:false,
            payloads:"You have entered the quantity of the product "+ NameProduct +" more than the available salary, please re-enter less ("+QuantityProduct+")"
        }
    }
}
await AddPurchaseHistory(uid,PurDoc.id);
    
    
}
export const GetPurchaseHistoryByUser=async(uid,uPid)=>{
    const docRef = doc(db, CollectionName,uid,"PurchaseHistoryForUser",uPid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists())
        return await docSnap.data();
    return{
        success: false,
        payload:"No Purchase History"
    }
}

//Get quantity product
export const GetQuantity=async(uid,uPid)=>{
    const docRef = doc(db, CollectionName,uid,"PurchaseHistoryForUser",uPid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists())
        return await docSnap.data().Item;
    return{
        success: false,
        payload:"No Purchase History"
    }
}