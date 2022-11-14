import React from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Box, Flex, Img } from '@chakra-ui/react';
import styled from './Barchart.module.css';


  const  options={

    
    scales: {
        // maintainAspectRatio: false,
        responsive: true,
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
        
      ],
    
     
    

     
    },
    plugins: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 20
                }
            }
        }
    }
   
  }

const BarChart = ({arrtemp}) => {
    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wend', 'Thus',"Fri", 'Sat'],
        datasets: [{
          label: 'Weekly forecast',
          data: arrtemp,
          
            fill: {
              target: 'origin',
           
              above: 'rgb(184,223,253)'
            }
          ,
          borderColor: 'rgb(0,143,251)',
          tension: 0.1
        },
    
    
    ]
      };
     
  return (
    <Box style={{margin:"auto"}}   overflow="auto"  w={"80vw"} border={"1px solid red"}    >
      <Line className={styled.Chart} 
       options={options}
        data={data}
      width={600}
     
   
      
      />

    


      
    </Box>
  )
}

export default BarChart