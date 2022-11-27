import {expect, jest, test,it} from '@jest/globals';
import {GetProductById} from  '../Product/Product'

import { getFirestore } from "@firebase/firestore";

describe('firebase testing ',()=>{
    beforeAll(async()=>{
        jest.setTimeout(10000)
        await getFirestore();
    })
    beforeEach(async()=>{
        const product =  await GetProductById("QN2QqV40L7rF0FsLqZc5")
        expect(true).toBe(true)
    })
})


