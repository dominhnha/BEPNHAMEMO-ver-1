import { db } from '../../Firebase__config'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, limit, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { GetRevenuePerMonth } from '../Authencation/Report';
import { GetConditionsApply, GetPercentDiscountByID } from '../Authencation/Discount';

const CollectionName = "Product"

export const AddProduct = async (newProduct) => {
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
    } = newProduct;
    const initNewProduct = {
        NameProduct: NameProduct,
        DescriptionProduct: DescriptionProduct,
        Ingerdient: Ingerdient,
        Price: Price,
        Quantity: Quantity,
        ImageIdProduct: ImageIdProduct,
        exp: Timestamp.fromDate(new Date(exp)),
        mfg: Timestamp.fromDate(new Date(mfg)),
        Classify: Classify,
        DayProduce: serverTimestamp(),

    }
    const colRef = collection(db, CollectionName)
    return await addDoc(colRef, initNewProduct)
        .then(e => {
            return {
                success: true,
                payload: initNewProduct,
            }
        })
        .catch((error) => {
            return {
                success: false,
                payload: error,
            }
        })

};
// Timestamp cover date by toDate()
export const GetProductById = async (pid) => {
    const docRef = doc(db, CollectionName, pid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            success: true,
            payload: {
                Pid: pid,
                Info: docSnap.data(),
            }
        }
    } else {
        // doc.data() will be undefined in this case
        return {
            success: false,
            payload: "No such document!",
        }
    }
}

//Get new product
export const getNewProduct = async (number) => {
    const colRef = collection(db, CollectionName);
    return await getDocs(query(colRef, orderBy("DayProduce", "asc"), limit(number)))
        .then(async (docs) => {
            let ListProduct = [];
            docs.forEach(item => {
                ListProduct.push({
                    Pid: item.id,
                    Info: item.data()
                })
            })
            return {
                success: true,
                payload: ListProduct
            }
        })
        .catch(err => {
            return {
                success: false,
                payload: err
            }
        });

}

// get all product
export const GetAllProduct = async () => {
    try {
        const colRef = collection(db, CollectionName);
        const docsSnap = await getDocs(colRef);
        let ListProduct = []
        docsSnap.forEach(doc => {
            ListProduct.push({
                Pid: doc.id,
                Info: doc.data()
            })

        })
        return {
            success: true,
            payload: ListProduct,
        }
    } catch (e) {
        return {
            success: false,
            payload: null,
        }
    }

}
//Classify product
export const classifyProduct = async (ClassifyName, name, proviso) => {
    console.log(ClassifyName, name, proviso);
    const colRef = collection(db, CollectionName);
    return await getDocs(query(colRef,
        where("Classify", "==", `${ClassifyName}`)
        , orderBy(`${name}`, `${proviso}`)
    ))
        .then(async (docs) => {
            console.log(docs)
            let ListProduct = [];
            docs.forEach(item => {
                ListProduct.push({
                    Pid: item.id,
                    Info: item.data()
                })
            })
            return {
                success: true,
                payload: ListProduct
            }
        })
        .catch(err => {
            return {
                success: false,
                payload: err
            }
        });
}
// get by sort
//name = PriceProduct,NameProduct, QuantityProduct
//proviso = desc/asc
// desc =  Decrease
// asc = Ascending 
export const sortProduct = async (name = "", proviso = "") => {
    const colRef = collection(db, CollectionName);
    return await getDocs(query(colRef, orderBy(`${name}`, `${proviso}`)))
        .then(async (docs) => {
            let ListProduct = [];
            docs.forEach(item => {
                ListProduct.push({
                    Pid: item.id,
                    Info: item.data()
                })
            })
            return {
                success: true,
                payload: ListProduct
            }
        })
        .catch(err => {
            return {
                success: false,
                payload: err
            }
        });

}

//Delete Product
export const deleteProduct = async (pid) => {
    try {
        await deleteDoc(doc(db, CollectionName, pid))
        return {
            success: true,
            payload: "Product removed"
        }
    }
    catch (e) {
        return {
            success: false,
            payload: e,
        }
    }
}

//Update product
export const updateProduct = async (pid, updateInfo) => {
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
    } = updateInfo;
    const docRef = doc(db, CollectionName, pid);
    return await updateDoc(docRef, {
        NameProduct: NameProduct,
        DescriptionProduct: DescriptionProduct,
        Ingerdient: Ingerdient,
        Price: Price,
        Quantity: Quantity,
        ImageIdProduct: ImageIdProduct,
        exp: new Timestamp.fromDate(new Date(exp)),
        mfg: new Timestamp.fromDate(new Date(mfg)),
        Classify: Classify,
    })
        .then(docRef => {
            return {
                success: true,
                payload: "Product information was updated successfully."
            }
        })
        .catch(e => {
            return {
                success: false,
                payload: e
            }
        })
}
//Get name Product
export const GetNameProduct = async (pid) => {
    const docRef = doc(db, CollectionName, pid);
    const docSnap = await getDoc(docRef);
    let NameProduct = "";
    if (docSnap.exists()) {
        NameProduct = docSnap.data().NameProduct;
        return await NameProduct;
    }
    else {
        return {
            success: false,
            payload: "No product"
        }
    }
}
//Get PriceProduct
export const GetPriceProduct = async (pid) => {
    const docRef = doc(db, CollectionName, pid);
    const docSnap = await getDoc(docRef);
    let PriceProduct = "";
    if (docSnap.exists()) {
        PriceProduct = docSnap.data().Price;
        return PriceProduct;
    }
    else {
        return {
            success: false,
            payload: "No product"
        }
    }
}
//Get Quantity Product By it
export const GetQuantityProduct = async (pid) => {
    const docRef = doc(db, CollectionName, pid);
    const docSnap = await getDoc(docRef);
    let Quantity = "";
    if (docSnap.exists()) {
        Quantity = docSnap.data().Quantity;
        return Quantity;
    }
    else {
        return {
            success: false,
            payload: "No product"
        }
    }
}
//Add best sell products
export const AddBestSell = async (pid, quantity) => {
    const docRef = doc(db, "BestSellProduct", pid);
    const docSnap = await getDoc(docRef);
    let infoProduct = await GetProductById(pid);
    if (docSnap.exists()) {
        await updateDoc(docRef, {
            Pid: pid,
            Info: infoProduct.payload.Info,
            QuantitySold: increment(quantity)
        })
    } else {
        const initBestSell = {
            Pid: pid,
            Info: infoProduct.payload.Info,
            QuantitySold: quantity,
        }
        await setDoc(docRef, initBestSell);
    }
}
//Best sell Product
export const GetBestsellProduct = async (number) => {
    const colRef = collection(db, "BestSellProduct");
    return await getDocs(query(colRef, orderBy("QuantitySold", "desc"), limit(number)))
        .then(async (docs) => {
            let ListProduct = [];
            docs.forEach(item => {
                ListProduct.push({
                    Info: item.data()
                })
            })
            return {
                success: true,
                payload: ListProduct
            }
        })
        .catch((err) => {
            return {
                success: false,
                payload: err,
            }
        })

}

//Search for Product
export const SearchProduct = async (queryText) => {
    const colRef = collection(db, CollectionName);
    const docsSnap = await getDocs(colRef);
    let ListProduct = []
    docsSnap.forEach(doc => {
        ListProduct.push({
            Pid: doc.id,
            Info: doc.data()
        })

    })
    return ListProduct.filter(function (e) {
        return e.Info.NameProduct.toLowerCase().includes(queryText.toLowerCase())

    })
}


//Check conditionsApply Discount for product

export const CheckConditionApplyDiscount = async (dpid) =>{
    const Now = new Date(Date.now());
    const Month = Now.getMonth()+1;
    const Year = Now.getFullYear();
    const ListRev = await (await GetRevenuePerMonth( Month, Year)).payload.Item;
    const ConditionsApply = await(await GetConditionsApply(dpid)).payload.Info
    const PercentDiscount = await GetPercentDiscountByID(dpid)
    const ListProduct = [];
    for(let i=0;i<ListRev.length;i++){
        if(ListRev[i].QuantitySold>=ConditionsApply){
            ListProduct.push(ListRev[i])
        }
    }
    for(let i=0;i<ListProduct.length;i++){
        const Price = await GetPriceProduct(ListProduct[i].Pid);
        await updateDoc(doc(db,CollectionName,ListProduct[i].Pid),{
            Discount:PercentDiscount,
            PriceDiscount: Price*(1-PercentDiscount)
        })
    }
}
