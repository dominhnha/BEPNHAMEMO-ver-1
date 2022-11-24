import {db} from '../../Firebase__config'
import { addDoc, collection, doc, getDoc} from "firebase/firestore";


const CollectionName = "PurchaseHistory"

export const AddPurchaseHistory = async(uid,uPid)=>{
    const docRef = doc(db, "User",uid,"PurchaseHistoryForUser",uPid);
    const docSnap = await getDoc(docRef);
    const colRef = collection(db, CollectionName);
    const initPur = {
        Uid:uid,
        PurchaseHistory:docSnap.data(),
    }
    await addDoc(colRef,initPur)
    
    
}

//get PurchaseHistory by user
export const GetPurchaseHistoryByUser = async(uid)=>{

}