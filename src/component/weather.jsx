import React, { useEffect, useState } from 'react'
import { GiPositionMarker } from 'react-icons/gi';
import { AiOutlineSearch } from 'react-icons/ai';

import city from "../data.json"
import styled from './weather.module.css';
import Weeklyforecast from './Weeklyforecast';

const Weather = () => {
    const [allcity, setallcity] = useState([])
    const [search, Update] = useState("");
    const [name, Setup] = useState();
    const [timer, setTimer] = useState(null)
    const [displays ,setdisplays] =useState(true)

    var d = city.city
var arr =[]


    const ApiData = async () => {
        const Data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=878162b8edc3bd325da302ab67304a4c`)
        const datajson = await Data.json();
  
        const fulldata = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${datajson.coord.lat}&lon=${datajson.coord.lon}&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric`)
      
        const fulldatajson = await fulldata.json();

        Setup(fulldatajson)
   
      
    }




const inputChanged = e => {
   
    Update(e.target.value);
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
        ApiData()
    }, 1000)

    setTimer(newTimer)
  }

useEffect(()=>{

    ApiData()
    
  
   
},[search])



    useEffect(() => {
        function ipLookUp () {
            fetch('http://ip-api.com/json')
                .then((res)=>res.json()).then((r)=>  {
                    
                    Update(r.city)
                  })
                   
              }
              
        
              
                  
                
              
            
              if ("geolocation" in navigator) {
                // check if geolocation is supported/enabled on current browser
                navigator.geolocation.getCurrentPosition(
                 function success(position) {
                    ipLookUp()
                
                 },
              function error(error_message) {
                  // for when getting location results in an error
                  console.error('An error has occured while retrieving location', error_message)
                  ipLookUp()
               })
            
              } else {
                // geolocation is not supported
                // get your location some other way
                console.log('geolocation is not enabled on this browser')
                ipLookUp()
              }
       
    }, [])

    return (
        <div className={styled.container}  >
            <div className={styled.inputdiv}  >
                <GiPositionMarker fontSize={"35px"} />
                <input type="search" placeholder="search city" value={search} onChange={inputChanged} />
                <AiOutlineSearch fontSize={"35px"} />

            </div>
            <div style={{zIndex:"1"}}  >
                {search.length == 0 ? (d.map((e) => {


                    return <div key={e.id} className={styled.mapdiv}  onClick={() =>{ 
                     
                        Update(e.name)}}>
                        <div className={styled.citydiv}><span>{e.name}</span><span>{e.state}</span></div>
                        <div className={styled.lastdiv}>
                            <div >
                                <div>{e.temp}</div>
                                <div>{e.weather}</div>

                            </div>

                            <div className={styled.imgdiv} >
                                {e.weather === "clear" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                                {e.weather === "smoke" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                                {e.weather === "clouds" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/cloudy.ac49ed24.svg' /> : ""}
                                {e.weather === "sunny" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                                {e.weather === "Haze" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                            </div>





                        </div>
                    </div>
                })) : (d.filter((elem) =>

                    elem.name.indexOf(search) !== -1 ? true : false
                )
                    .map((e) => {
                        return <div key={e.id} className={styled.mapdiv} 
                        style={{display:(displays=="true") ? "block":"none"}} 
                        onClick={() =>{ 
                            setdisplays("false")
                            Update(e.name)}}>
                        <div className={styled.citydiv}><span>{e.name}</span><span>{e.state}</span></div>
                        <div className={styled.lastdiv}>
                            <div >
                                <div>{e.temp}</div>
                                <div>{e.weather}</div>

                            </div>

                            <div className={styled.imgdiv} >
                                {e.weather === "clear" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                                {e.weather === "smoke" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                                {e.weather === "clouds" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/cloudy.ac49ed24.svg' /> : ""}
                                {e.weather === "sunny" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                                {e.weather === "Haze" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                            </div>





                        </div>
                    </div>

                    }))}

            </div>

        
            <div className={styled.forsticky} style={{display:search.length!==0 ? "block":"none"}} >

            { name && <Weeklyforecast map={name}/>}



            </div>
            <div>

               
            </div>





        </div >
    )
}

export default Weather