import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./AddProduct.scss"
import Section, { SectionBody, SectionTitle } from '../Section/Section'
import { GetAllProduct } from '../../services/Product/Product'
const AddProduct = props => {
    const [Product , setProduct] = useState([])
    useEffect(()=>{
      const getProduct = async()=>{
        const data = await GetAllProduct();
        if(data.success == true){
          setProduct(data.payload)
        }
        console.log(data)
      }
      getProduct()
    },[])
  return (
    <div className=''>
         <div className='Colection'>
          <Section>
            <SectionTitle>
              Colection
            </SectionTitle>
            <SectionBody>
                <div className="Colection__list">
                  {
                    Product && Product.map((item)=>{
                      return(
                          <div className="Colection__item">
                            <p>{item.Pid}</p>
                            <h2>{item.Info.NameProduct}</h2>
                          </div>
                      )
                    })
                  }
                  
                </div>
            </SectionBody>
          </Section>
        </div>
    </div>
  )
}

AddProduct.propTypes = {}

export default AddProduct