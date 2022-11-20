import React from 'react'
import PropTypes from 'prop-types'
import "./Search.scss"
import { useState } from 'react'
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section'
import Grid from '../../components/Grid/Grid'
import Candy from '../../assets/Img/Candy.jpg'
import Event from '../../assets/Img/event.jpg'
import Pastry from '../../assets/Img/Pastry.jpg'
import Socola from '../../assets/Img/Socola.jpg'
import SaltyCake from '../../assets/Img/Salty-cake.jpg'
import { classifyProduct, searchProduct } from '../../services/Product/Product'
import { v4 } from 'uuid'
const listClassify = [
  
  {
    title:"Kẹo",
    payload:"Candy",
    field:"Classify",
    image:Candy,
  },
  {
    title:"Bánh ngọt",
    payload:"Pastry",
    field:"Classify",
    image:Pastry,
  },
  {
    title:"Bánh mặn",
    payload:"Salty cake",
    field:"Classify",
    image:SaltyCake,
  },
  {
    title:"Socola",
    payload:"Chocolate",
    field:"Classify",
    image:Socola,
  },
  {
    title:"Bánh sự kiện",
    payload:"Holiday cake",
    field:"Classify",
    image:Event,
  },

]

const Search = props => {
  const [value,SetValue] = useState(null)
  const [Products,setProducts] = useState(null);

  const handleSubmit = async(keywords)=>{
      const data = await searchProduct(keywords,null,null);
      if(data.success == true){
        setProducts(data.payload);
      }
      console.log("data",data);    
  }

  const handleClassify = async(Classify)=>{
    const data = await classifyProduct(Classify );
    console.log("classifyProduct",data)
  }
  return (
    <div className='Search'>
      <div className="container">
        <div className="Search__top">
          <h2 className="Search__title">
              Tìm Kiếm Sản Phẩm
          </h2>
          <div className="Search__group">
              <input 
                type="text"
                value={value}
                onChange={(e)=>SetValue(e.target.value)}
                placeholder="Nhập tên sản phẩm tìm kiếm"
              />
              <button onClick={()=>handleSubmit(value)}>
                <i class='bx bx-search'></i>
              </button>
          </div>
        </div>
        <div className="Search__bottom">
          <Section>
            <SectionTitle>
              Sản Phẩm Đề Suất 
            </SectionTitle>
            <SectionBody>
              <Grid
                col={5}
                mdCol={2}
                smCol={1}
                gap={20}
              > 
                {
                  listClassify.map(((item,index)=>{
                    return(
                      <div 
                        className='Search__opinion'
                        key={index}
                        onClick={()=>handleClassify(item.payload)}
                      >
                        <img src={item.image} alt="" />
                        <h2>{item.title}</h2>
                      </div>
                    )
                  }))
                }
              </Grid> 
            </SectionBody>
          </Section>
          <Section>
            <SectionTitle>
              Sản Phẩm Đề Suất 
            </SectionTitle>
            <SectionBody>
              <Grid
                col={5}
                mdCol={2}
                smCol={1}
                gap={20}
              > 
                {
                  listClassify.map(((item,index)=>{
                    return(
                      <div 
                        className='Search__opinion'
                        key={index}
                        onClick={()=>handleClassify(item.payload)}
                      >
                        <img src={item.image} alt="" />
                        <h2>{item.title}</h2>
                      </div>
                    )
                  }))
                }
              </Grid> 
            </SectionBody>
          </Section>
        </div>
      </div>
    </div>
  )
}

Search.propTypes = {}

export default Search