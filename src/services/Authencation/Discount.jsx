import { db } from '../../Firebase__config'
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, Timestamp } from "firebase/firestore";
import { GetPriceProduct } from '../Product/Product';
import { GetRevenuePerMonth } from './Report';

const CollectionName = "Discount";
const did = "DiscountCode";
const subNameDiscountForEvent = "DiscountForEvent";
const subNameDiscountForProduct = "DiscountForProduct";
const subNmaeDiscountForHoliday = "DiscountForHoliday";
const colRefDiscountForEvent = collection(db, CollectionName, did, subNameDiscountForEvent);
const colcRefDiscountForProduct = collection(db, CollectionName, did, subNameDiscountForProduct);
const colRefDiscountForHoliday = collection(db, CollectionName, did, subNmaeDiscountForHoliday);

//Covert percent to number
function toDecimal(percent) {
    const parsed = parseFloat(percent);
  
    if (!Number.isNaN(parsed)) {
      return parseFloat(percent) / 100;
    } else {
      return 0;
    }
  }
/*
EXP: expiry date
MFG: manufacturing date
PercentDiscount = "Number%"
ex: PercentDiscount = "30%"
 */
/*Discount for event*/
//Add discount for event
export const AddDiscountForEvent = async (newDiscount) => {
    const {
        NameDiscount,
        DescriptionDiscount,
        PercentDiscount,
        Exp,
        Mfg,
        Quantity,
    } = newDiscount;
    const initDiscount = {
        NameDiscount: NameDiscount,
        DescriptionDiscount: DescriptionDiscount,
        PercentDiscount: PercentDiscount,
        Exp: Timestamp.fromDate(new Date(Exp)),
        Mfg: Timestamp.fromDate(new Date(Mfg)),
        Quantity: Quantity,
    }
    return await addDoc(colRefDiscountForEvent, initDiscount)
        .then(e => {
            return {
                success: true,
                payload: initDiscount,
            }
        })
        .catch((e) => {
            return {
                success: false,
                payload: e,
            }
        })
};

//Get all discount for event
export const GetDiscountForEvent = async () => {
    try {
        const docsSnap = await getDocs(colRefDiscountForEvent);
        const ListDiscount = [];
        docsSnap.forEach(doc => {
            ListDiscount.push({
                Did: doc.id,
                PercentDiscount: doc.data().PercentDiscount,
                Exp: doc.data().Exp.toDate().toLocaleString("en", { month: "long", year:"numeric",day:"numeric"}),
                Mfg: doc.data().Mfg.toDate().toLocaleString("en", { month: "long", year:"numeric",day:"numeric"}),
                Quantity: doc.data().Quantity,
            })
        })
        return {
            success: true,
            payload: ListDiscount
        }
    } catch (e) {
        return {
            success: false,
            payload: e
        }
    }

}

//get discount for event by id
export const GetDiscountForEventById = async(DVid)=>{
    const docRef = doc(db, CollectionName, did,subNameDiscountForEvent,DVid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return{
            success:true,
            payload:docSnap.data()
        }
    }
    else{
        return{
            success:false,
            payload:"A discount code does not exist."
        }
    }
}

//-1 discount add to button pay 
export const IncrementDiscount = async (DVid) => {
    const docRef = doc(db, CollectionName, did,subNameDiscountForEvent,DVid);
    await updateDoc(docRef, {
        Quantity: await GetQuantityDiscountForEvent(DVid) - 1
    })
}

//Get get quantity discount for event
export const GetQuantityDiscountForEvent = async(DVid)=>{
    const docRef = doc(db, CollectionName, did,subNameDiscountForEvent,DVid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return await docSnap.data().Quantity;
    }
    else {
        return {
            success: false,
            payload: "A discount code does not exist.",
        }
    }
}

//Get percent discount for event
export const GetPercentDiscountForEvent = async(DVid)=>{
    const docRef = doc(db, CollectionName, did,subNameDiscountForEvent,DVid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return toDecimal(docSnap.data().PercentDiscount)
    }
    else{
        return{
            success: false,
            payload:"A discount code does not exist."
        }
    }
}

//Check discount code 
export const CheckDiscountForEvent = async(DVid) => {
    const docRef = doc(db, CollectionName, did,subNameDiscountForEvent,DVid);
    const docSnap = await getDoc(docRef);
    const MFG = await docSnap.data().Mfg.toMillis();
    const EXP = await docSnap.data().Exp.toMillis();
    let quantity = await GetQuantityDiscountForEvent(DVid);
    const Now = new Date();
    const Time = Now.getTime();
    if ((Time >= MFG && Time <= EXP) && quantity > 0) {
        return toDecimal(docSnap.data().PercentDiscount);
    }
    else {
        return 0;
    }
}
/*----------------------------------------------------------*/

/*Discount for product
Discount for product conditionsApply > quantitySoldOrMonth Before

*/
//Add discount for product
export const AddDiscountForProduct = async (newDiscount) => {
    const { 
        NameDiscount,
        PercentDiscount,
        ConditionsApply, 
    } = newDiscount;
    const initDiscount = {
        NameDiscount: NameDiscount,
        PercentDiscount: PercentDiscount,
        ConditionsApply: ConditionsApply,
    }
    return await addDoc(colcRefDiscountForProduct, initDiscount)
        .then(e => {
            return {
                success: true,
                payload: initDiscount,
            }
        })
        .catch((error) => {
            return {
                success: false,
                payload: error,
            }
        })
}

//Get all discount for product
export const GetDiscountForProduct = async () => {
    try {
        const docsSnap = await getDocs(colcRefDiscountForProduct);
        const ListDiscount = [];
        docsSnap.forEach(doc => {
            ListDiscount.push({
                Did: doc.id,
                PercentDiscount: doc.data().PercentDiscount,
                ConditionsApply: doc.data().ConditionsApply
            })
        })
        return {
            success: true,
            payload: ListDiscount
        }
    } catch (e) {
        return {
            success: false,
            payload: e
        }
    }

}

//Get discount for product by id
export const GetDiscountForProductById = async(DPid)=>{
    const docRef = doc(db, CollectionName, did,subNameDiscountForProduct,DPid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return{
            success:true,
            payload:docSnap.data()
        }
    }
    else{
        return{
            success:false,
            payload:"A discount code does not exist."
        }
    }
}

//Get percent discount for product
export const GetPercentDiscountForProduct = async(DPid)=>{
    const docRef = doc(db, CollectionName, did,subNameDiscountForProduct,DPid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        let PercentDiscount = toDecimal(await docSnap.data().PercentDiscount);
        return PercentDiscount;
    }
    else{
        return{
            success: false,
            payload:"A discount code does not exist."
        }
    }
}

//Get conditionsApply discount for product
export const GetConditionsApplyDiscountForProduct = async(DPid)=>{
    const docRef = doc(db, CollectionName, did,subNameDiscountForProduct,DPid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return await docSnap.data().ConditionsApply
    }
    else{
        return{
            success:false,
            payload:"A discount code does not exist."
        }
    }
}
//Check discount for product
export const CheckDiscountForProduct = async(DPid)=>{
    const Now = new Date(Date.now());
    const Month = Now.getMonth();
    const Year = Now.getFullYear();
    const ListRev = await (await GetRevenuePerMonth( Month, Year)).payload.Item;
    const ConditionsApply = await GetConditionsApplyDiscountForProduct(DPid);
    const PercentDiscount = await GetPercentDiscountForProduct(DPid);
    const ListProduct = [];
    for(let i=0;i<ListRev.length;i++){
        if(ListRev[i].QuantitySold>=ConditionsApply){
            ListProduct.push(ListRev[i])
        }
    }
    for(let i=0;i<ListProduct.length;i++){
        const Price = await GetPriceProduct(ListProduct[i].Pid);
        function surprise() {
            (function loop(CheckConditionApplyDiscount) {
                var now = new Date();
                if (now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() === 0) {
                    updateDoc(doc(db,"Product",ListProduct[i].Pid),{
                        Discount:PercentDiscount,
                        PriceDiscount: Price*(1-PercentDiscount)
                    })
                }
                
                now = new Date();                  // allow for time passing
                var delay = 60000 - (now % 60000); // exact ms to next minute interval
                setTimeout(loop, delay);
            })();
        }
        
        return surprise();
}
}

/*----------------------------------------------------------*/

/*
Discount for Classify Holiday
*/

//Add discount for holiday
export const AddDiscountForHoliday = async (newDiscount) => {
    const {
        NameDiscount,
        DescriptionDiscount,
        PercentDiscount,
        Exp,
        Mfg,
    } = newDiscount;
    const initDiscount = {
        NameDiscount: NameDiscount,
        DescriptionDiscount: DescriptionDiscount,
        PercentDiscount: PercentDiscount,
        Exp: Timestamp.fromDate(new Date(Exp)),
        Mfg: Timestamp.fromDate(new Date(Mfg)),
    }
    return await addDoc(colRefDiscountForHoliday, initDiscount)
        .then(e => {
            return {
                success: true,
                payload: initDiscount,
            }
        })
        .catch((e) => {
            return {
                success: false,
                payload: e,
            }
        })
}

//Get all discount for Holiday
export const GetDiscountForHoliday = async () => {
    try {
        const docsSnap = await getDocs(colRefDiscountForHoliday);
        const ListDiscount = [];
        docsSnap.forEach(doc => {
            ListDiscount.push({
                Did: doc.id,
                PercentDiscount: doc.data().PercentDiscount,
                Exp: doc.data().Exp.toDate().toLocaleString("en", { month: "long", year:"numeric",day:"numeric"}),
                Mfg: doc.data().Mfg.toDate().toLocaleString("en", { month: "long", year:"numeric",day:"numeric"}),
            })
        })
        return {
            success: true,
            payload: ListDiscount
        }
    } catch (e) {
        return {
            success: false,
            payload: e
        }
    }
}

//get discount for holiday by id
export const GetDiscountForHolidayById = async(DHid)=>{
    const docRef = doc(db, CollectionName, did,subNmaeDiscountForHoliday,DHid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return{
            success:true,
            payload:docSnap.data()
        }
    }
    else{
        return{
            success:false,
            payload:"A discount code does not exist."
        }
    }
}

//Get percent discount for holiday
export const GetPercentDiscountForHoliday = async(DHid)=>{
    const docRef = doc(db, CollectionName, did,subNmaeDiscountForHoliday,DHid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return toDecimal(docSnap.data().PercentDiscount)
    }
    else{
        return{
            success: false,
            payload:"A discount code does not exist."
        }
    }
}

/*----------------------------------------------------------*/





