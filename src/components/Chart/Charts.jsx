import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    CategoryScale,
    Chart,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
  } from "chart.js";
  
  import { Line } from "react-chartjs-2";
import Section, { SectionBody, SectionTitle } from '../Section/Section';
import "./Chart.scss"
import { useEffect } from 'react';
import { GetAllProduct } from '../../services/Product/Product';
const Charts = props => {
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
    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Legend,
        Tooltip,
        Filler
      );
      const chartData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133,44,77,22,77,11  ],
            label: "Total",
            fill: false,
            borderColor: "#FFC888",
            backgroundColor: "#FF8B04",
            radius: 4,
            hoverRadius: 5,
            tension: 0.1
          },
          
        ],
        
      };
  
      const options = {
        responsive: true,
        interaction: {
          intersect: false,
          mode: "x"
        },
        hover: {
          mode: "index",
          interactive: false
        },
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "total"
          },
          tooltip: {
            mode: "x",
            yAlign: "bottom"
          }
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
      
          /*, your other options*/
          
          }
          
      };
  return (
    <div className='Chart'>
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
        <div className="Chart__view">
        <Section>

          <Line data={chartData} options={options} />
        </Section>
        </div>
    </div>
  )
}

Charts.propTypes = {}

export default Charts