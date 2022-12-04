import React, { useCallback, useState } from 'react'
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
import { GetTotalQuantitySoldOrMonth } from '../../services/Authencation/Report';
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
      data: [86, 114, 106, 106, 107, 111, 133, 44, 77, 22, 77, 11],
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
const listMonth = [1,2,3,4,5,6,7,8,9,10,11,12]
const Charts = props => {
  const [Product, setProduct] = useState([])
  const [active, SetActive] = useState(null)
  const [chart,setChart] = useState(chartData)
  // get All product
  useEffect(() => {
    const getProduct = async () => {
      const data = await GetAllProduct();
      if (data.success == true) {
        setProduct(data.payload)
      }
      console.log(data)
    }
    getProduct()
  }, [])
  // checked active product
  const handleActive = useCallback((Pid) => {
    SetActive(Pid)
  }, [active])

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
  const getTotal = async()=>{

  }

  useEffect(()=>{
    const getData = async()=>{
      const date = new Date().getFullYear();
      const listTotal = listMonth.map(async(item)=>{
        const data =  await GetTotalQuantitySoldOrMonth(item,date);
        return data;
      })
      const data = await Promise.all(listTotal)
      console.log(data)
    
      
      
    }
   getData(); 
  })
  return (
    <div className='Chart'>
      <div className='Colection'>
        <>
          <SectionTitle>
            <div className={`Chart__title ${active == null ? "active" : ""}`}>
              <span>
                Colection
              </span>
              <i class={`bx bx-home `}></i>
            </div>
          </SectionTitle>
          <SectionBody>
            <div className="Colection__list">
              {
                Product && Product.map((item) => {
                  return (
                    <div className={`Colection__item ${item.Pid.includes(active) ? "active" : ""}`} onClick={(e) => handleActive(item.Pid)} >
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
      <div className="Chart__view">
        <Section>

          <Line data={chart} options={options} />
        </Section>
      </div>
    </div>
  )
}

Charts.propTypes = {}

export default Charts