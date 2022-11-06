import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Logo from '../../assets/Img/NEPNHAMEMO__LOGO.png'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../Icon/Icon'
import  './Header.scss'


import { getDatabase } from 'firebase/database'
import { AuthContext } from '../../contexts/AuthContextProvider'
import Avatar from '../Avatar/Avatar'
import { object } from 'yup/lib/locale'

const Header = props => {

  const {pathname} = useLocation();
 
  const navBar = [
    {
      title: 'Trang chủ',
      path: '/',
    },
    {
      title: 'Sản phẩm',
      path: '/Product',
    }
    ,{
      title:'liên hệ',
      path: '/contact',
    }
    
  ]

  const DomHeader  = useRef(null);
  // active navber menu 
  const activeNavbar = ()=>{
      DomHeader.current.classList.toggle('active');
  }
  // load auth
  const {Authur} = useContext(AuthContext);
  const [quantity,setQuantity] = useState(0);

//   Pid:"QN2QqV40L7rF0FsLqZc5",
  useEffect(() => {
    const handleQuantity = ()=>{
      if(Authur.success == false){
        setQuantity(0);
      }else if (Authur.success == true && Authur.payload.user.Cart.length <= 0){
        setQuantity(0);
      }else{
        setQuantity(Authur.payload.user.Cart.length)
      }
    }
    if(Authur.success){
      console.log()
    }
    handleQuantity();
  }, [Authur])

  useEffect(()=>{
    // input new obj
    if(Authur.success == true){
      const CartUser = Authur.payload.user
      const newUser = Authur.payload.user.Cart.map(item=>{
        if(item.Pid == "QN2QqV40L7rF0FsLqZc5"){
          const initQuantity = item.Number++;
          return{
            Pid:item.Pid,
            Number:initQuantity,
          }
        }
        else{
          return item
        }
      })
      console.log("P",newUser)
    }
  },[Authur])
  
  console.log('load auth',Authur);

  

 
  const database = getDatabase();
  // console.log('database',auth.currentUser.uid);
  const VietName = {
    a:"nhật",
    b:"Tuấn"
  }
  const Eng = ["a","b","c"]
  const handleMap = ()=>{

    
    const newArr = Object.entries(VietName);
    const list = newArr.filter(item=>{
      const name = Eng.filter(i=>{
        if(i == item[0]){
          return {
            vietname:item[0],
            eng:item[1],
          }
        }
      })
      return name;
    }) 
   
    
  }
  handleMap()



 
  return (
    <header className='Header' ref={DomHeader}>    
        <div className="container">
            <div className="Header__list">
                <div className="Header__logo">
                  <Link to="/">
                    <img src={Logo} className="Header__logo__img" alt="logo" />
                    <h2>Bếp Nhà Mẹ MỠ</h2>
                  </Link>
                </div>
                <nav className="Header__nav">
                    {
                      navBar.map((item, index) => {
                        return (
                          <div className={`Header__nav__item ${pathname == item.path ? `active` :``}`} key={index}>
                              <Link onClick={()=>activeNavbar()} to={item.path}>{item.title}</Link>
                          </div>
                        )
                      })
                    }
                    <i onClick={()=>activeNavbar()} className='Header__nav__icon bx bx-chevron-left' ></i>
                </nav>
                <ul className="Header__user">
                    <li className="Header__user__item">
                        <Icon
                          icon={"bx bx-search"}
                          path={"/Product"}
                          describe={"Tìm kiếm"}
                        />
                    </li>
                    <li className="header__user__item">
                        <Icon
                          icon={"bx bx-cart-alt"}
                          path={Authur.success !== false ? "/Account/Cart" : "/Account/SignIn"}
                          describe={"Giỏ hàng"}
                          quantity={quantity}
                        />
                    </li>
                    {
                      Authur.success !== false
                       ?<Avatar
                          img={ Authur.payload.user.ImgUser}
                          path={"Account/SignIn"}
                       />
                       :
                       <li className="header__user__item">
                        <Icon
                          icon={"bx bx-user"} 
                          path={"/Account/SignIn"}
                          describe={"Đăng nhập"}
                        />
                      </li> 
                    }
                    
                    
                </ul>
              <i onClick={()=>activeNavbar()} className='Header__mobile bx bx-menu-alt-right'></i>
            </div>
        </div>
    </header>
  )
}

Header.propTypes = {}

export default Header