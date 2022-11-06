import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import {AUTH__SET} from '../../reducers/type'
import {AuthContext} from '../../contexts/AuthContextProvider';
import {  AddUserAuthencation,SiginUserAuthencation} from '../../services/Authencation/Authencation';
import { async } from '@firebase/util';
import {  AddUserCollection, GetToCart, GetUserCollection, setNewCart } from '../../services/Authencation/User';
import { AddProduct, getNewProduct, GetProductById, searchProduct, sortProduct} from '../../services/Product/Product';
import Slider from '../../components/Slider/Slider';
import ProductCand from '../../components/ProductCand/ProductCand';
import Grid from '../../components/Grid/Grid';
import { v4 } from 'uuid';
import Button from '../../components/Button/Button/Button';
import { Link } from 'react-router-dom';
import ComponentLoading from '../../components/LoadingSkeleton/ComponentLoading/ComponentLoading';
import "./Home.scss"
const Home = props => {
  
  const {Authur,dispatch} = useContext(AuthContext);
  const [newProduct,setNewProduct] = useState([]);
  const [bestSaleProduct,setBestSaleProduct] = useState([]);
  // useEffect(()=>{
  //   console.log('Home: ')
  //   const uploadUser = ()=>{
  //        dispatch({
  //          type:AUTH__SET,
  //          payload:{
  //              user:{
  //                  uid:"#3333",
  //                  user:{
  //                   name:"minh nhat",
  //                 },        
  //              }
  //          }
  //      })
  //     }
  //     uploadUser();
  //   },[])
    
 
    const login = useCallback(async()=>{
      const user = {
        email:"minhNhat11@gmail.com",
        password:"111111",
      }
      const data = await GetProductById("l6jV6gk5Mprw9wVKBWef");
      
      console.log(data);
      
    })
    // useEffect(()=>{
    //   const getData = async()=>{
    //     // const data = await setNewCart("etHlUPkyCYOyf3ecJ04brGuwM232",[
    //     //   {Number:2,Pid:"QN2QqV40L7rF0FsLqZc5"}
    //     // ]);
    //     const data = await GetToCart("etHlUPkyCYOyf3ecJ04brGuwM232");
    //     console.log("data",data)
        
        
    //   }
    //   getData()
    // },[])
    useEffect(()=>{
      const getData = async () => {
        try{
          // const data = await sortProduct("Quantity","asc");
          // const data = await searchProduct("K");
          const data =await searchProduct(null,"NameProduct","asc")
          console.log("data1",data);
        }catch(e){
          console.log(e);
        }
      }
      getData()
    },[])
    useEffect(()=>{
      const getData = async()=>{
        const data = await getNewProduct(7);
        if(data.success) setNewProduct(data.payload);
        
      }
      getData()
    },[])
   console.log(newProduct)
    return (
      <div className='Home'>
        {/*---------------- slider----------------- */}
        <Slider> 
        </Slider>
        {/*---------------- end Slider------------- */}

        {/* ----------------newproduct---------------- */}
        <div className="container">
          <div className="Home__section">
              <div className="Home__section__top">
                  <div className="Home__section__wrapper">
                      <h2>Sản phẩm mới</h2>
                      <Link to={"/Product"}>
                        <Button>Xem Thêm</Button>
                      </Link>  
                  </div>
                  
              </div>
              <div className="Home__section__bottom">
                <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
                > 
                  {
                    newProduct.length > 0
                    ? newProduct.map(item=>{
                      return(
                        <ProductCand
                          key={v4()}
                          Pid={item.Pid}
                          Name={item.Info.NameProduct}
                          Description={item.Info.DescriptionProduct}
                          Image={item.Info.Image}
                          Price={item.Info.Price}
                          sale={30}
                        />
                      )
                    })
                    : Array(8)
                    .fill(0)
                    .map(item=>{
                      return(
                        <ComponentLoading key={v4()}/>
                      )
                    })
                  }
                </Grid>
              </div>
          </div>
        
{/* -------------------------------best sale--------------------------------- */}
          <div className="Home__section">
              <div className="Home__section__top">
                  <div className="Home__section__wrapper">
                      <h2>Sản phẩm mới</h2>
                      <Link to={"/Product"}>
                        <Button>Xem Thêm</Button>
                      </Link>  
                  </div>
                  
              </div>
              <div className="Home__section__bottom">
                <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
                > 
                  {
                    bestSaleProduct.length > 0
                    ? newProduct.map(item=>{
                      return(
                        <ProductCand
                          key={v4()}
                          Pid={item.Pid}
                          Name={item.Info.NameProduct}
                          Description={item.Info.DescriptionProduct}
                          Image={item.Info.Image}
                          Price={item.Info.Price}
                          sale={30}
                        />
                      )
                    })
                    : Array(8)
                    .fill(0)
                    .map(item=>{
                      return(
                        <ComponentLoading key={v4()}/>
                      )
                    })
                  }
                </Grid>
              </div>
          </div>
        </div>
      </div>
      )
    }

Home.propTypes = {}

export default Home