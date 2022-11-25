import {db} from '../../Firebase__config'
import { addDoc, collection, doc, getDoc, getDocs, increment, limit, orderBy, query, serverTimestamp, setDoc,updateDoc,where } from "firebase/firestore";

const CollectionName = "Product"

export const AddProduct = async(newProduct) => {
    const {
        NameProduct,
        DescriptionProduct,
        Ingerdient,
        Price,
        Quantity,
        ImageIdProduct,
        exp,
        mfg,
        Classify,
        Disocount,
    } = newProduct;
    const initNewProduct ={
        NameProduct: NameProduct,
        DescriptionProduct:DescriptionProduct,
        Ingerdient:Ingerdient,
        Price:Price,
        Quantity:Quantity,
        ImageIdProduct:ImageIdProduct,
        exp:exp,
        mfg:mfg,
        Classify:Classify,
        DayProduce:serverTimestamp(),
        Disocount:Disocount,
        
    }
    const initNameProduct={
        NameProduct:NameProduct,
    }
    const n = newProduct.NameProduct.toLowerCase();
    let array = [];
    for(let i=0;i<=n.length;i++) {
        array.push(n.substring(0,i));
    }
    const colRef = collection(db, CollectionName);
    const docSnap = await addDoc(colRef,initNewProduct)
    await setDoc(doc(db,"NameProduct",docSnap.id),initNameProduct); 
    await updateDoc(doc(db,"NameProduct",docSnap.id),{
        NameArray: array,
    })
};
// Timestamp cover date by toDate()
export const GetProductById = async(pid)=>{
    const docRef = doc(db, CollectionName, pid);   
    const docSnap = await getDoc(docRef);
    let infoProduct = "";
    if (docSnap.exists()) {
        infoProduct = docSnap.data();
        return infoProduct;
            
    } else {
        // doc.data() will be undefined in this case
        return {
            success: false,
            payload:"No such document!",
        }
    }
} 

 //Get new product
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
export const classifyProduct = async(ClassifyName , name , proviso) =>{
    console.log(ClassifyName , name , proviso);
    const colRef = collection(db,CollectionName);
    return await getDocs(query(colRef,
        where("Classify","==",`${ClassifyName}`)
        ,orderBy(`${name}`,`${proviso}`)     
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


//product search
// export const searchProduct = async(queryText,name, proviso)=>{
//     const colRef = collection(db,CollectionName);
//     return await getDocs(query(colRef,
//         orderBy(`${name}`, `${proviso}`)
//         ,where('NameProduct','>=', `${queryText}`)
//         ,where('NameProduct','<=', `${queryText + '\uf8ff'}` ))
//         )        
//         .then(async(docs)=>{
//             console.log("docs",docs)
//             let ListProduct = [];
//             docs.forEach(item=>{
//                 ListProduct.push({
//                     Pid:item.id,
//                     Info:item.data()
//                 })
//             })
//             return {
//                 success: true,
//                 payload:ListProduct
//             }
//         })
//         .catch(err => {
//             return {
//                 success: false,
//                 payload:err
//             }
//         });
// }

export const searchProduct = async(queryText,fieldName,proviso)=>{
    const colRef = collection(db,CollectionName);
    if(queryText === null){
        return await getDocs(query(colRef, orderBy(`${fieldName}`,`${proviso}`)))
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
    else if(fieldName === null ||proviso === null){
        return await getDocs(colRef
            ,where('NameProduct','>=', `${queryText}`)
            ,where('NameProduct','<=', `${queryText + '\uf8ff'}` )
            ,orderBy('NameProduct'))
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
    else{
        return await getDocs(colRef
            ,where('NameProduct','>=', `${queryText}`)
            ,where('NameProduct','<=', `${queryText + '\uf8ff'}` )
            ,orderBy('NameProduct')
            ,orderBy(fieldName,proviso))
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
//Add best sell products
export const AddBestSell=async(pid,quantity)=>{
    const docRef = doc(db,"BestSellProduct",pid);
    const docSnap = await getDoc(docRef);
    let infoProduct = await GetProductById(pid);
    if(docSnap.exists()){
await updateDoc(docRef,{
        Pid:pid,
        Info:infoProduct,
        QuantitySold: increment(quantity)
        })
    }else{
    const initBestSell = {
        Pid:pid,
        Info:infoProduct,
        QuantitySold:quantity,
    } 
    await setDoc(docRef,initBestSell);
}
}
//Best sell Product
export const GetBestsellProduct = async(number)=>{
    const colRef = collection(db, "BestSellProduct");
    return await getDocs(query(colRef,orderBy("QuantitySold", "desc"),limit(number)))
    .then(async(docs)=>{
        let ListProduct =[];
        docs.forEach(item=>{
            ListProduct.push({
                Info:item.data()
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

//Search for Product
export const SearchProduct = async(querrText)=>{
    const colRef = collection(db, "NameProduct");
    return await getDocs(query(colRef,
        where("NameArray","array-contains",`${querrText.toLowerCase()}`)))
        .then(async(docs)=>{
            let ListProduct =[];
            docs.forEach(item=>{
                ListProduct.push({
                    Info: item.id
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
