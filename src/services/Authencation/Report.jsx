import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../Firebase__config'
import { GetAllProduct, GetNameProduct } from '../Product/Product'
import { getWeekNumber } from 'react-calendar/dist/esm/shared/dates';
import { CALENDAR_TYPES } from 'react-calendar/dist/esm/shared/const';



const CollectionName = "RevenuePerMonth"
const Now = new Date(Date.now());
const Month = Now.toLocaleString("en", { month: "long" });
const Year = Now.getFullYear();
const subName = Month + " " + Year;
const revID = "oZaVDRFI6OBiZvDs4I9W";
const subID = Month + Year;
const docRef = doc(db, CollectionName, revID, subName, subID);
/*
Add RevenuePerMonth
*/


export const AddRevenuePerMonth = async () => {

    const newRev = {
        Item: [],
        TotalQuantitySold: ""
    }

    function surprise() {
        (function loop(AddRevenuePerMonth) {
            var now = new Date();
            if (now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() === 0) {
                setDoc(docRef, newRev);
            }
            now = new Date();                  // allow for time passing
            var delay = 60000 - (now % 60000); // exact ms to next minute interval
            setTimeout(loop, delay);
        })();
    }
    return surprise();
}
export const AddProductToRevenue = async (pid, quantity) => {
    const NameProduct = await GetNameProduct(pid);
    const initProduct = {
        NameProduct: NameProduct,
        QuantitySold: quantity,
        Pid: pid
    }
    await updateDoc(docRef, {
        Item: arrayUnion(initProduct)
    });

    const docSnap = await getDoc(docRef);
    let QuantitySold = 0;
    for (let i = 0; i < docSnap.data().Item.length; i++) {
        if (docSnap.data().Item[i].QuantitySold === 0) {
            await updateDoc(docRef, {
                Item: arrayRemove(
                    docSnap.data().Item[i]
                )
            })
        }
        else {
            QuantitySold += docSnap.data().Item[i].QuantitySold
        }
    }
    await updateDoc(docRef, {
        QuantitySold: QuantitySold
    })
}


export const RevenuePerMonth = async () => {
    const docsSnap = await getDocs(collection(db, "PurchaseHistory"));
    const ListPurchase = [];
    docsSnap.forEach(doc => {
        ListPurchase.push({
            PurId: doc.id,
            Month: doc.data().DayPurchased.toDate().getMonth() + 1,
            Year: doc.data().DayPurchased.toDate().getFullYear(),
            Item: doc.data().Item
        })
    })
    const month = Now.getMonth + 1;
    const year = Now.getFullYear();

    const ListProduct = await (await GetAllProduct()).payload;
    const ListItem = [];
    for (let i = 0; i < ListPurchase.length; i++) {
        if (month === ListPurchase[i].Month && year === ListPurchase[i].Year) {
            ListItem.push(ListPurchase[i].Item);
        }
    }
    const flatValues = ListItem.reduce((total, value) => {
        return total.concat(value);
    }, []);

    for (let i = 0; i < ListProduct.length; i++) {
        let total = 0;
        for (let j = 0; j < flatValues.length; j++) {

            if (ListProduct[i].Pid === flatValues[j].pid) {
                total += flatValues[j].quantity
            }

        }
        await AddProductToRevenue(ListProduct[i].Pid, total);

    }
}

export const GetQuantitySoldProductOrMonth = async (pid, month, year) => {
    if (month >= 1 && month <= 12) {
        const date = new Date(year, month - 1);
        const dateM = date.toLocaleString("en", { month: "long" });
        const dateY = date.getFullYear();
        const querySubNameID = dateM + dateY;
        const querySubName = dateM + " " + dateY;
        const docRefQuan = doc(db, CollectionName, revID, querySubName, querySubNameID);
        const docSnap = await getDoc(docRefQuan);
        if (docSnap.exists()) {
            for (let i = 0; i < docSnap.data().Item.length; i) {
                if (pid === docSnap.data().Item[i].Pid)
                    return {
                        success: true,
                        payload: docSnap.data().Item[i].QuantitySold
                    }
            }
        }
        else {
            return {
                success: false,
                payload: "No such document!"
            }
        }

    }
    else {
        return {
            success: false,
            payload: ""
        }
    }
}

export const GetTotalQuantitySoldOrMonth = async (month, year) => {
    if (month >= 1 && month <= 12) {
        const date = new Date(year, month - 1);
        const dateM = date.toLocaleString("en", { month: "long" });
        const dateY = date.getFullYear();
        const querySubNameID = dateM + dateY;
        const querySubName = dateM + " " + dateY;
        const docRefQuan = doc(db, CollectionName, revID, querySubName, querySubNameID);
        const docSnap = await getDoc(docRefQuan);
        if (docSnap.exists()) {
            return {
                success: true,
                payload: docSnap.data().QuantitySold
            }
        }
        else {
            return {
                success: false,
                payload: "No such document!"
            }
        }
    }
    else {
        return {
            success: false,
            payload: ""
        }
    }
}

export const GetRevenuePerMonth = async (month, year) => {
    if (month >= 1 && month <= 12) {
        const date = new Date(year, month - 1);
        const dateM = date.toLocaleString("en", { month: "long" });
        const dateY = date.getFullYear();
        const querySubNameID = dateM + dateY;
        const querySubName = dateM + " " + dateY;
        const docRefQuan = doc(db, CollectionName, revID, querySubName, querySubNameID);
        const docSnap = await getDoc(docRefQuan);
        if (docSnap.exists()) {
            return {
                success: true,
                payload: docSnap.data()
            }
        }
        else {
            return {
                success: false,
                payload: "No such document!"
            }
        }
    }
    else {
        return {
            success: false,
            payload: ""
        }
    }
}

//Get the total price for month and year.

export const GetTotalPriceForMonth = async (month) => {
    const docsSnap = await getDocs(collection(db, "PurchaseHistory"));
    const ListPurchase = [];
    docsSnap.forEach(doc => {
        ListPurchase.push({
            PurId: doc.id,
            Month: doc.data().DayPurchased.toDate().getMonth() + 1,
            Year: doc.data().DayPurchased.toDate().getFullYear(),
            Item: doc.data().Item,
            Total:doc.data().Total,
            Discount: doc.data().Discount,
            Payments:doc.data().Payment
        })
    })
    const ListItem = [];
    for (let i = 0; i < ListPurchase.length; i++) {
        if (month === ListPurchase[i].Month) {
            ListItem.push({
                Discount: ListPurchase[i].Discount,
                Payment:ListPurchase[i].Payments,
                Item:ListPurchase[i].Item,
                ToTal:ListPurchase[i].Total
            });

        }
    }
    let TotalPrice =0;
    for (let i = 0; i < ListItem.length; i++) {
        TotalPrice+=ListItem[i].ToTal;
    }
    ListItem.push(TotalPrice)
    return{
        success: true,
        payload:ListItem,
    }

}

export const GetTotalPriceForYear = async (year) => {
    const docsSnap = await getDocs(collection(db, "PurchaseHistory"));
    const ListPurchase = [];
    docsSnap.forEach(doc => {
        ListPurchase.push({
            PurId: doc.id,
            Month: doc.data().DayPurchased.toDate().getMonth() + 1,
            Year: doc.data().DayPurchased.toDate().getFullYear(),
            Item: doc.data().Item,
            Total:doc.data().Total,
            Discount: doc.data().Discount,
            Payments:doc.data().Payment
        })
    })
    const ListItem = [];
    for (let i = 0; i < ListPurchase.length; i++) {
        if (year === ListPurchase[i].Year) {
            ListItem.push({
                Discount: ListPurchase[i].Discount,
                Payment:ListPurchase[i].Payments,
                Item:ListPurchase[i].Item,
                ToTal:ListPurchase[i].Total
            });

        }

    }
    let TotalPrice =0;
    for (let i = 0; i < ListItem.length; i++) {
        TotalPrice+=ListItem[i].ToTal;
    }
    ListItem.push(TotalPrice)
    return{
        success: true,
        payload:ListItem,
    }

}

//getWeek
/*
npm install react-calendar
*/
//Get total price for week
export const GetTotalPriceForWeek = async()=>{
    const week = getWeekNumber(Now,CALENDAR_TYPES.US);
    const docsSnap = await getDocs(collection(db, "PurchaseHistory"));
    const ListPurchase = [];
    docsSnap.forEach(doc => {
        ListPurchase.push({
            PurId: doc.id,
            Week:getWeekNumber(doc.data().DayPurchased.toDate(),CALENDAR_TYPES.US),
            Total:doc.data().Total
        })
    })
    let Total =0;
    for(let i=0; i < ListPurchase.length; i++) {
        if(week ===ListPurchase[i].Week){
            Total+=ListPurchase[i].Total;
        }
    }
    
    return{
        success: true,
        payload:{
            Week:week,
            Year:Now.getFullYear(),
            TotalPrice:Total
        }
    }
}
