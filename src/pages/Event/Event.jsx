import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Event.scss'
import { Link } from 'react-router-dom'
import EventBanner from '../../assets/Img/EventBanner.jpg'
import Section from '../../components/Section/Section'
import Button from '../../components/Button/Button/Button';
import Grid from '../../components/Grid/Grid';
import ProductCand from '../../components/ProductCand/ProductCand';
import { v4 } from 'uuid';
import ComponentLoading from '../../components/LoadingSkeleton/ComponentLoading/ComponentLoading';
import {classifyProduct} from '../../services/Product/Product';


const Event = props => {
  const [Classify ,setClassify] = useState([]);
  useEffect(()=>{
      window.scrollTo(0, 0)
  },[])
    useEffect(()=>{
        try{
            const getData = async()=>{
            const data = await classifyProduct("Holiday cake");
            console.log("data",data);
            if(data.success) setClassify(data.payload);
            
            }
            getData()

        } catch(e){
            console.log(e);
        }
        
        },[])
    console.log(Classify)
    
  return (
    <div className="Event">
        <div className="container Event__container">
            <div className="Event__banner">
                <img src={EventBanner} alt="" />
            </div>
            <Section>
            <div className="Event__section">
                <div className="Event__section__top">
                    <div className="Event__section__wrapper">
                        <h2>Sản Phẩm Giới Hạn Dịp Năm Mới</h2>
                        <Link to={"/Product"}>
                          <Button>Xem Thêm</Button>
                        </Link>  
                    </div>
                    
                </div>
                <div className="Event__section__bottom">
                  <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={20}
                  > 
                    {
                      Classify.length > 0
                      ? Classify.map(item=>{
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
          </Section>
        </div>
        
        
    </div>
  )
}

Event.propTypes = {}

export default Event