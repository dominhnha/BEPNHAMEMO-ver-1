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
import { toast } from "react-toastify";
import { GetProductById } from '../../services/Product/Product';
import EffectLoanding from '../../components/LoadingSkeleton/EffectLoanding/EffectLoanding';
import { AddToCart, GetToCart, GetUserCollection, setNewCart } from '../../services/Authencation/User';
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { AUTH__SET, CART__REMOVE, CART__UPDATA } from '../../reducers/type';
import Cart from '../Cart/Carts';
import { CartContext } from '../../contexts/CartContextProvider';



const ProductView = props => {
  const history = useNavigate();
  const {Cart,dispatch} = useContext(CartContext);
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
    toast.success(`Thêm thành công 
     ${slug}
     `, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    try{
      dispatch({
        type:CART__UPDATA,
        payload:{
            Pid:slug,
            Quantity:quantity,
            Price:product.Info.Price,
            Image:product.Info.Image,
            NameProduct:product.Info.NameProduct,
        }         
      })
        
     
    }catch(e){
      console.log(e)
    }
  },[Cart,product])
  //--------------- user payment product----------------- 
  const handlePayment = useCallback((e)=>{
    try{
      
    }catch(e){
      console.log(e)
    }
  },[])

  console.log(slug)
  console.log("Product",product)
  console.log(Cart)

  
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
                    <span className="ProductView__desc">giá</span>
                      {
                          product != null
                          ? 
                          <>
                            <p className="ProductView__discount">{product.Info.Price}₫</p>
                            <p className="ProductView__cur">{(product.Info.Price+1000)}₫</p>
                          </>
                          : <EffectLoanding/>
                        }
                      
                    </div>
                    <div className="ProductView__element">
                      <span className="ProductView__desc">Thành phần chính:</span>
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
                      <span className="ProductView__desc">Số lượng</span>
                      <ButtonQuantity
                        quantity={quantity}
                        setQuantity={setQuantity}
                      />
                    </div>
                    <div className="ProductView__control">
                        <Button
                          onClick={handleAddToCart}
                        >
                          Thêm Giỏ Hàng
                        </Button>
                        <Button
                          onClick={null}
                        >
                          Mua Ngay
                        </Button>
                    </div>
                </div>
          </div>
          <div className="ProductView__infomation">
              <SectionTitle>
                  Thông tin chi tiết sản phẩm
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
                    <span className="ProductView__expiryday__title"> Hạng sử dụng</span>
                    <li>
                      <span className="ProductView__desc"> từ ngày</span> {product.Info.exp.toDate().toDateString()}
                    </li>
                    <li>
                      <span className="ProductView__desc"> Đến ngày</span> {product.Info.mfg.toDate().toDateString()}
                    </li>
                  </ul>
                : <EffectLoanding/>
              }
              
              <div className="ProductView__infomation__desc">
                      <span className="ProductView__desc">Mô Tả sản Phẩm :</span>
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