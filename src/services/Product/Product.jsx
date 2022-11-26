import {db} from '../../Firebase__config'
import { addDoc, collection, doc, getDoc, getDocs, increment, limit, orderBy, query, setDoc, Timestamp,updateDoc,where } from "firebase/firestore";

const CollectionName = "Product"

export const AddProduct = async() => {
    const NewProduct = {
        NameProduct: "",
        DescriptionProduct: "",
        Ingerdient: "",
        PriceProduct: "",
        QuantityProduct: "",
        ImageIdProduct: "",
        exp: await Timestamp.fromDate(new Date("December 10,1900")),
        mfg: await Timestamp.fromDate(new Date("December 10,1900")),
        Classify: "",
    }
    const CollectionRef = collection(db, CollectionName);
    return await addDoc(CollectionRef,NewProduct)
    .then(e=>{
        return {
            success: true,
            payload:NewProduct,
        }
    })
    .catch((error) => {
        return {
            success: false,
            payload:error,
        }
    })
};


// Timestamp cover date by toDate()
export const GetProductById = async(pid)=>{
    const docRef = doc(db, CollectionName, pid);   
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            success: true,
            payload:{
                Pid:pid,
                Info:docSnap.data(),
            }
        }
    } else {
        // doc.data() will be undefined in this case
        return {
            success: false,
            payload:"No such document!",
        }
    }
} 

 //Get 6 new product
 export const getNewProduct = async(number) => {
    const colRef = collection(db, CollectionName);
    return await getDocs(query(colRef, orderBy("DayProduce", "asc"), limit(number)))
    .then(async(docs)=>{
        let ListProduct = [];
        docs.forEach(item=>{
            ListProduct.push({
                Pid:item.id,
                Info:item.data()
            })
        })
        return {
            success: true,
            payload:ListProduct
        }
    })
    .catch(err => {
        return {
            success: false,
            payload:err
        }
    });
  
}

// get all product
export const GetAllProduct = async() => {
    try{
        const colRef = collection(db, CollectionName);
        const docsSnap = await getDocs(colRef);
        let ListProduct = []
        docsSnap.forEach(doc => {
            ListProduct.push({
                Pid:doc.id,
                Info:doc.data()
            })
            
        })
        return {
            success: true,
            payload:ListProduct,
        }
    }catch(e){
        return {
            success: false,
            payload:null,
        }
    }
    
}
//Classify product
export const classifyProduct = async(ClassifyName) =>{
    if(ClassifyName == null){
        return await GetAllProduct();
    }
    const colRef = collection(db,CollectionName);
    return await getDocs(query(colRef,
         where("Classify","==",`${ClassifyName}`)
    ))
    .then(async(docs)=>{
        console.log(docs)
        let ListProduct = [];
        docs.forEach(item=>{
            ListProduct.push({
                Pid:item.id,
                Info:item.data()
            })
        })
        return{
            success: true,
            payload:ListProduct
        }
    })
    .catch(err =>{
        return {
            success: false,
            payload:err
        }
    });      
}
// get by sort
//name = PriceProduct,NameProduct, QuantityProduct
//proviso = desc/asc
 // desc =  Decrease
 // asc = Ascending 
export const sortProduct = async(name = "", proviso = "") =>{
    const colRef = collection(db, CollectionName);
    return await getDocs(query(colRef, orderBy(`${name}`, `${proviso}`) ))
    .then(async(docs)=>{
        let ListProduct = [];
        docs.forEach(item=>{
            ListProduct.push({
                Pid:item.id,
                Info:item.data()
            })
        })
        return {
            success: true,
            payload:ListProduct
        }
    })
    .catch(err => {
        return {
            success: false,
            payload:err
        }
    });
            
}



//Search for Product
export const searchProduct = async(querrText)=>{
    const colRef = collection(db, CollectionName);
    const docsSnap = await getDocs(colRef);
    let curProduct = []
    docsSnap.forEach(doc => {
        curProduct.push({
            Pid:doc.id,
            Info:doc.data()
        })
    })
    const indexProduct = curProduct.filter((e,index)=>{  
        return e.Info.NameProduct.toLowerCase().includes(querrText.toLowerCase())
    })
    if(indexProduct.length > 0){
        return{
            success: true,
            payload:indexProduct,
        }
    } else{
        return{
            success: false,
            payload:[],
        }
    }
}

//Add best sell products
export const AddBestSell=async(pid,quantity)=>{
    const docRef = doc(db,"BestSellProduct",pid);
    const docSnap = await getDoc(docRef);
    let infoProduct = await GetProductById(pid);
    if(docSnap.exists()){
await updateDoc(docRef,{
        Pid:pid,
        Info:infoProduct.Info,
        QuantitySold: increment(quantity)
        })
    }else{
    const initBestSell = {
        Pid:pid,
        Info:infoProduct.Info,
        QuantitySold:quantity,
    } 
    await setDoc(docRef,initBestSell);
}
}
//Best sell Product
export const GetBestsellProduct = async(number)=>{
    const colRef = collection(db, "BestSellProduct");
    return await getDocs(query(colRef,orderBy("QuantitySold","desc"),limit(number)))
    .then(async(docs)=>{
        console.log(docs)
        let ListProduct =[];
        docs.forEach(item=>{
            ListProduct.push({
                Info:item.data().Info
            })
        })
        return{
            success:true,
            payload:ListProduct
        }
    })
    .catch((err)=>{
        return{
            success:false,
            payload:err,
        }
    })

}

//Get name Product
export const GetNameProduct = async(pid)=>{
    const docRef = doc(db, CollectionName,pid);
    const docSnap = await getDoc(docRef);
    let NameProduct = "";
    if(docSnap.exists()){
        NameProduct = docSnap.data().NameProduct;
        return await NameProduct;
    }
    else{
        return{
            success: false,
            payload:"No product"
        }
    }
}
//Get PriceProduct
export const GetPriceProduct = async(pid)=>{
    const docRef = doc(db, CollectionName,pid);
    const docSnap = await getDoc(docRef);
    let PriceProduct = "";
    if(docSnap.exists()){
        PriceProduct = docSnap.data().Price;
        return PriceProduct;
    }
    else{
        return{
            success: false,
            payload:"No product"
        }
    }
}
//Get Quantity Product By it
export const GetQuantityProduct = async(pid)=>{
    const docRef = doc(db, CollectionName,pid);
    const docSnap = await getDoc(docRef);
    let Quantity = "";
    if(docSnap.exists()){
        Quantity = docSnap.data().Quantity;
        return Quantity;
    }
    else{
        return{
            success: false,
            payload:"No product"
        }
    }
}
