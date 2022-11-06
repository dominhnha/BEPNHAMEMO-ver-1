import {db} from '../../Firebase__config'
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, Timestamp,where } from "firebase/firestore";

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
    if(fieldName === null ||proviso === null){
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
