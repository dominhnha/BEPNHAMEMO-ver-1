import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import "./AddProduct.scss"
import Section, { SectionBody, SectionTitle } from '../Section/Section'
import { GetAllProduct } from '../../services/Product/Product'
import { useCallback } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import Button from '../Button/Button/Button'
const initProduct = {
  Info: {
    Classify: "",
    DayProduce: "",
    Ingerdient: "",
    NameProduct: "",
    Price: "",
    PriceDiscount: "",
    Quantity: "",
    exp: "",
    mfg: ""
  },
  Pid: ""
}
const AddProduct = props => {
  const [Product, setProduct] = useState([]);
  const [active, setActive] = useState(null)
  const [formProduct, setFormProduct] = useState(initProduct);
  const [status, setStatus] = useState(true)
  // fech data in database
  useEffect(() => {
    const getProduct = async () => {
      const data = await GetAllProduct();
      if (data.success == true) {
        setProduct(data.payload)
      }
    }
    getProduct()
  }, [])
  // find curreent item in Product
  useEffect(() => {
    if (Product.length > 0) {
      const data = Product.find(item => {
        return item.Pid.includes(active);
      })
      setFormProduct(data);
    }

  }, [active])

  // checked active 
  const handleActive = useCallback((Pid) => {
    setActive(Pid)
  }, [active])

  // check edit = 
  const handleStatus = useCallback(()=>{
    setStatus(false)
  },[active])


  const addNewProduct = useCallback(() => {
    // code edit is here 
    console.log("DaTaFrom",formProduct)
    // formik.values.Info.NameProduct = "oke";
    console.log(formik.values)
    setStatus(true)
  }, [formProduct])

  const editProduct = useCallback(() => {
      setActive(null);
      setFormProduct(initProduct);
  },[]);


  const formik = useFormik({
    initialValues: {
      address: "",
      delivery:"",
      voucher:"",
    },
    validationSchema: Yup.object({

    }),
    onSubmit: async (values) => {
      setStatus(true)
      // addNewProduct()
      console.log("v;",values)
    }
  })
  
  return (
    <div className='AddProduct'>
      <div className='Colection AddProduct__list'>
        <>
          <SectionTitle>
            <div className='AddProduct__title'>
              <span>
                Colection
              </span>
              <i className={`bx bx-plus ${active==null ? "active" : ""}`} onClick={(e)=>editProduct()} ></i>
            </div>


          </SectionTitle>
          <SectionBody>
            <div className="Colection__list">
              {
                Product && Product.map((item) => {
                  return (
                    <div className={`Colection__item ${item.Pid.includes(active) ? "active" : ""}`} 
                         onClick={(e) => handleActive(item.Pid)}
                          key={item.Pid}
                    >
                      <p>{item.Pid}</p>
                      <h2>{item.Info.NameProduct}</h2>
                    </div>
                  )
                })
              }

            </div>
          </SectionBody>
        </>
      </div>
      <div className="AddProduct__From">

        <SectionTitle>
          <div className='AddProduct__title'>
            <span>
              ID
            </span>
            {
              status 
              ? <div className="AddProduct__btn"  onClick={()=>handleStatus()}
              >
                  <Button>Chỉnh sửa</Button>
                </div>
              :<div className="AddProduct__btn" onClick={formik.submitForm}>
                  <Button>Lưu</Button>
                </div>
            }
          </div>
        </SectionTitle>
        <SectionBody>
          <form action="">
          <div className="input-container border--active">
                <input 
                  id = "address"
                  name = "address"
                  type="text"
                  // placeholder = "Email / Số điện thoại"
                  onChange = {formik.handleChange}
                  onBlur = {formik.handleBlur}
                  value={ formik.values.address}
                  
                />
                <label>Email / Số điện thoại</label>
                {formik.touched.emailOrPhoneNumber && formik.errors.emailOrPhoneNumber ?  <p className="error-message">{formik.errors.emailOrPhoneNumber}</p> : null}
              </div>
          </form>
        </SectionBody>


      </div>
    </div>
  )
}

AddProduct.propTypes = {}

export default AddProduct