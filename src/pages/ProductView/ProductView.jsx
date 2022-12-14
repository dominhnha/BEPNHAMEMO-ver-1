import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './ProductView.scss'
import { v4 } from 'uuid';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";



// import required modules
import { FreeMode, Navigation, Thumbs, Mousewheel } from "swiper";
import ButtonQuantity from '../../components/Button/ButtonQuantity/ButtonQuantity';
import Button from '../../components/Button/Button/Button';
import { useNavigate, useParams } from 'react-router';
import { GetProductById } from '../../services/Product/Product';
import EffectLoanding from '../../components/LoadingSkeleton/EffectLoanding/EffectLoanding';
import { AddToCart, GetToCart, GetUserCollection, setNewCart } from '../../services/Authencation/User';
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { AUTH__SET } from '../../reducers/type';



const ProductView = props => {
  const history = useNavigate();
  const {Authur,dispatch} = useContext(AuthContext);

  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product,setProduct] = useState(null);
   // get Slug by Url
   const {slug} = useParams();
   useEffect(()=>{
    window.scrollTo(0,0);
   },[])
  //EffectLoanding

  useEffect(()=>{
    //call data API 
    const getProduct = async()=>{
      try{
        const initProduct =  await GetProductById(slug);
        if(initProduct.success){
          setProduct(initProduct.payload);
        }
      }catch(e){
        console.log(e)
      }
    }
    getProduct();
  },[])

  console.log(product)
  //---------------- add to Cart user-------------------- 
  const handleAddToCart = useCallback( async(curCart) =>{
    try{
      if(Authur.success == false){
        history("/Account/SignIn")
      }else{
        const initProduct = {
          Pid:slug,
          Number:quantity,
        }
        let tmp = false;
        let curCart = Authur.payload.user.Cart;
        // check id in Cart
        const newCart = curCart.map(item=>{
          if(item.Pid == initProduct.Pid){
            let initNumber = Number( item.Number + initProduct.Number)
            tmp = true;
            return {
              Pid:item.Pid,
              Number:initNumber,
            }
          }else{
            return item;
          }
        })     
        if(tmp == true){
          setNewCart( Authur.payload.uid, newCart)
        }else{
          newCart.push(initProduct)
          setNewCart( Authur.payload.uid, newCart)
        }
        // get new user 
        const initUser = await GetUserCollection(Authur.payload.uid);
          if(initUser.success){
            dispatch({
              type:AUTH__SET,
              payload:{
              user:{
                  uid:Authur.payload.uid,
                  user:initUser.payload,        
              }
            }         
            })
          }
      }        
    }catch(e){
      console.log(e)
    }
  },[Authur])
  //--------------- user payment product----------------- 
  const handlePayment = useCallback((e)=>{
    try{
      
    }catch(e){
      console.log(e)
    }
  },[])

  console.log(slug)
  console.log(product)

  
  return (
    <div className="ProductView">
      <div className="container">
          <div className="ProductView__Product">
                <div className="ProductView__left">
                <div className="slider">
                  <div className="slider__flex">
                    <div className="slider__col">
                      <div className="slider__prev">
                        <i class='bx bx-chevron-left'></i>
                      </div>
                      {
                        product!= null 
                        ? <div className="slider__thumbs">    
                            <Swiper
                              onSwiper={setImagesNavSlider}
                              direction="vertical"
                              spaceBetween={10}
                              slidesPerView={3}
                              centeredSlides={true} 
                              loop={true} 
                              navigation={{
                                nextEl: ".slider__next",
                                prevEl: ".slider__prev"
                              }}
                              className="slider__warpper"
                              modules={[Navigation, Thumbs]}
                            >
                              {product && product.Info.Image.map((item) => {
                                return (
                                  <SwiperSlide key={v4()}>
                                    <div className="slider__image">
                                      <img src={item} alt="" />
                                    </div>
                                  </SwiperSlide>
                                );
                              })}
                            </Swiper>
                        </div>
                        : 
                        <EffectLoanding
                            height={304}
                        />

                      }                      
                      <div className="slider__next">
                        <i class='bx bx-chevron-right'></i>
                      </div>
                    </div>
                    {
                       product != null 
                       ? <div className="slider__images">
                       <Swiper
                         thumbs={{ swiper: imagesNavSlider }}
                         direction="vertical"
                         slidesPerView={1}
                         spaceBetween={10}
                         mousewheel={true}
                         loop={true} 
                         navigation={{
                           nextEl: ".slider__next",
                           prevEl: ".slider__prev"
                         }}
                         
                         className="slider__warpper"
                         modules={[Navigation, Thumbs, Mousewheel]}
                         onSlideChange={() => console.log('slide change')}
                       >
                         {product!=null && product.Info.Image.map((item) => {
                           return (
                             <SwiperSlide key={v4()}>
                               <div className="slider__image slider__image__cur">
                                 <img src={item} alt="" />
                               </div>
                             </SwiperSlide>
                           );
                         })
                         
                       }
                       </Swiper>
                     </div>
                     : 
                     <EffectLoanding
                        height={400}
                     />
                    }
                    
                  </div>
                </div>
                </div>
                <div className="ProductView__right">
                    <SectionTitle>
                      {
                        product != null
                        ? <span>{product.Info.NameProduct}</span>
                        : <EffectLoanding/>
                      }
                    </SectionTitle>
                   
                    <div className="ProductView__price">
                    <span className="ProductView__desc">gi??</span>
                      {
                          product != null
                          ? 
                          <>
                            <p className="ProductView__discount">{product.Info.Price}???</p>
                            <p className="ProductView__cur">{(product.Info.Price+1000)}???</p>
                          </>
                          : <EffectLoanding/>
                        }
                      
                    </div>
                    <div className="ProductView__element">
                      <span className="ProductView__desc">Th??nh ph???n ch??nh:</span>
                      {
                          product != null
                          ? 
                          <>
                            {product.Info.Ingerdient}
                          </>
                          : <EffectLoanding height={100}/>
                        }
                      
                    </div>
                    <div className="ProductView__quantity">
                      <span className="ProductView__desc">S??? l?????ng</span>
                      <ButtonQuantity
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    </div>
                    <div className="ProductView__control">
                        <Button
                          onClick={handleAddToCart}
                        >
                          Th??m Gi??? H??ng
                        </Button>
                        <Button
                          onClick={handlePayment}
                        >
                          Mua Ngay
                        </Button>
                    </div>
                </div>
          </div>
          <div className="ProductView__infomation">
              <SectionTitle>
                  Th??ng tin chi ti???t s???n ph???m
              </SectionTitle>
             
              {/* <h2 className="ProductView__infomation__Name">
                      {
                        product != null
                        ? <span>{product.Info.NameProduct}</span>
                        : <EffectLoanding/>
                      }
              </h2> */}
              {
                product != null
                ? <ul className="ProductView__expiryday">
                    <span className="ProductView__expiryday__title"> H???ng s??? d???ng</span>
                    <li>
                      <span className="ProductView__desc"> t??? ng??y</span> {product.Info.exp.toDate().toDateString()}
                    </li>
                    <li>
                      <span className="ProductView__desc"> ?????n ng??y</span> {product.Info.mfg.toDate().toDateString()}
                    </li>
                  </ul>
                : <EffectLoanding/>
              }
              
              <div className="ProductView__infomation__desc">
                      <span className="ProductView__desc">M?? T??? s???n Ph???m :</span>
                      {
                          product != null
                          ? 
                          <>
                            {product.Info.DescriptionProduct}
                          </>
                          : <EffectLoanding height={100}/>
                        }
            
              </div>
                 
          </div>
          <div className="ProductView__more">
            <Section>
                <SectionTitle>
                        hello world
                </SectionTitle>
                <SectionBody>
                      
                </SectionBody>
            </Section>
          </div>
      </div>
        
    </div>
  )
}

ProductView.propTypes = {}

export default ProductView