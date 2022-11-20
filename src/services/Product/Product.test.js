import {expect, jest, test,it} from '@jest/globals';
import {GetProductById} from  '../Product/Product'

import {db} from '../../Firebase__config'
test('Get Product by id', async () => {
    const product =  await GetProductById("QN2QqV40L7rF0FsLqZc5")
    expect(product.success).toBe(true)
});
  