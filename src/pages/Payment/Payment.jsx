import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik';
import * as Yup from "yup"
import './Payment.scss'
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section';
import CustomSelect from '../../components/FieldCustom/CustomSelect';
import { PaymentContext } from '../../contexts/PaymentContextProvider';
import { v4 } from 'uuid';
import Sea from '../../components/Animation/Sea/Sea'
import { Link } from 'react-router-dom';
import {formatNumber } from '../../utils/Format'
import Button from '../../components/Button/Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
const options = [
  { value: 'advance', label: 'Thanh toán trước khi nhận hàng' },
  { value: 'later', label: 'Thanh toán sau khi nhận hàng' },
]
const Payment = props => {
  const { Payment,Paymentdispatch} = useContext(PaymentContext);
  const [Total,setTotal] = useState(0);
  useEffect(()=>{
    if(Payment.success == true && Payment.payload.length > 0){
      let tmp = 0;
      Payment.payload.map(item=>{
        const curTotal = Number(item.Price) * Number(item.Quantity);
        tmp+=curTotal;
      })
      setTotal(tmp);
    }
  },[Payment])

  const formik = useFormik({
    initialValues: {
      emailOrPhoneNumber: "",
      address: "",
      delivery:"",
      voucher:"",

    },
    validationSchema: Yup.object({
      emailOrPhoneNumber: Yup.string()
        .max(254, "Email hoặc số điện thoại bạn nhập phải ít hơn 254 kí tự")
        .required("Email / Số điện thoại không được bỏ trống")
        ,
      address: Yup.string().required("Địa chỉ không được bỏ trống"),
      delivery:Yup.string().required("Phương thức thanh toán không được bỏ trống")
    }),

    onSubmit: useCallback(
      async(values) => {
        try{
          // code is here
            if(values.emailOrPhoneNumber == ""){
              toast.error('Vui lòng nhập gmail/số điện thoại của bạn', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
              
          }
          if(values.address == ""){
            toast.error('Vui lòng nhập địa chỉ của bạn', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
          if(values.delivery == ""){
            toast.error('Vui lòng chọn phương thức thanh toán', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });

          }
          // code here
          console.log(values.emailOrPhoneNumber,values.address, values.delivery)
          console.log(Payment.payload)
        }catch(e){
          toast.error('Đã xảy ra lỗi vui lòng thử lại', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        
      },[Payment]
    ) 
  });

  return (
    <div className='Payment'>
      <div className="container Payment__container">
          <div className="Payment__infomation">
            <Section>
              <SectionTitle>Thông tin khách hàng</SectionTitle>
            <form action="">
              <div className="input-container border--active">
                <input 
                  id = "emailOrPhoneNumber"
                  name = "emailOrPhoneNumber"
                  type="text"
                  // placeholder = "Email / Số điện thoại"
                  onChange = {formik.handleChange}
                  onBlur = {formik.handleBlur}
                  value={formik.values.emailOrPhoneNumber}
                  required
                />
                <label>Email / Số điện thoại</label>
                {formik.touched.emailOrPhoneNumber && formik.errors.emailOrPhoneNumber ?  <p className="error-message">{formik.errors.emailOrPhoneNumber}</p> : null}
              </div>
              <div className="input-container border--active">
                <input 
                  id = "address"
                  name = "address"
                  type="text"
                  // placeholder = "Email / Số điện thoại"
                  onChange = {formik.handleChange}
                  onBlur = {formik.handleBlur}
                  value={formik.values.address}
                  required
                />
                <label>Địa Chỉ</label>
                {formik.touched.address && formik.errors.address ?  <p className="error-message">{formik.errors.address}</p> : null}
              </div>
              <div className="input-container">
                <CustomSelect
                  className='input'
                  onChange={value=>formik.setFieldValue('delivery',value.value)}
                  value={formik.values.delivery}
                  options={options}
                  placeholder={"Hình thức thánh toán"}
                  
                  />
                  {formik.touched.delivery && formik.errors.delivery ?  <p className="error-message active__error">{formik.errors.delivery}</p> : null}
              </div>
              {/* <button type="submit" onClick={formik.handleSubmit}>Đăng Nhập</button> */}
            </form>
            </Section>
            <Section>
              <SectionTitle>Mã giảm giá </SectionTitle>
              <div className="input-container border--active">
                <input 
                  id = "voucher"
                  name = "voucher"
                  type="text"
                  // placeholder = "Email / Số điện thoại"
                  onChange = {formik.handleChange}
                  onBlur = {formik.handleBlur}
                  value={formik.values.voucher}
                  required
                />
                <label>Nhập mã giảm giá để được ưu đãi nhé </label>
               
              </div>
            </Section>
          </div>
          <div className="Payment__Product">
              <Section>
                <SectionTitle> Hóa đơn sản phẩm</SectionTitle>
                <SectionBody>
                  {
                    Payment.success == true && Payment.payload.length > 0 
                    ?<div className="Payment__Product__list">
                      
                          {
                            Payment.payload.map(item=>{
                              const total = formatNumber(Number(item.Price) * Number(item.Quantity)) 
                              return(
                                <div className="Payment__Product__item">
                                    <div className="Payment__Product__wrapper">
                                      <div className="Payment__Product__img">
                                        <img src={item.Image[0]} alt="" />
                                      </div>
                                      <div className="Payment__Product__content">
                                        {/* <p>{item.Pid}</p> */}
                                        <h2>{item.NameProduct}</h2>
                                        <p>Số lượng: {item.Quantity}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="Payment__Product__price">
                                      
                                        <p>{formatNumber(total)}₫</p>
                                    </div>
                                </div>
                              )
                            })
                          }
                          
                       
                    </div>
                    :<div className='Payment__Product__404'>
                      <Sea></Sea>
                      <h2 >Rất tiếc bạn chưa chọn sản phẩm để thanh toán </h2>
                      <Link to={"/Account/Cart"}>Cùng quay lại giỏ hàng nhé !</Link>
                    </div>
                  }
                  
                </SectionBody>
                <SectionTitle>
                    <div className="Payment__total">
                      <div className="Payment__total__warpper">
                        <h2>Tổng tiền</h2>
                        <span>{formatNumber(Total)}₫</span>
                      </div>
                        
                        <div className="Payment__total__button" onClick={formik.handleSubmit}>
                          <Button>Mua Ngay</Button>
                        </div>
                    </div>
                </SectionTitle>
              </Section>
          </div>
      </div>
    </div>
  )
}

Payment.propTypes = {}

export default Payment