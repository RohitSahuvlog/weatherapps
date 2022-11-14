import React, { useEffect } from 'react';
import { DateTime } from "luxon";
import styled from './weeklyforecast.module.css';
import BarChart from './Barchart';
import { Box, Flex, Img } from "@chakra-ui/react"

const Weeklyforecast = (props) => {

    const { pressure, sunrise, sunset, humidity
    } = props.map.daily[0]
   




    function convertTime(unixTime) {
        let dt = new Date(unixTime * 1000)
        let h = dt.getHours()
        let m = "0" + dt.getMinutes()
        let t = h + ":" + m.substr(-2)
        return t
    }














    const formatToLocalTime = (
        secs,
        zone,
        format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
    ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
    var formatForecastWeather = (data) => {
        let { timezone, daily, hourly } = data;
        daily = daily.slice(1, 8).map((d) => {
            return {
                title: formatToLocalTime(d.dt, timezone, "ccc"),
                temp: d.temp.day,
                icon: d.weather[0].icon,
                report: d.weather[0].main
            };
        });
        return daily

    }
    var d = [...formatForecastWeather(props.map)]

    var arrtemp = []
    for (var i = 0; i < d.length; i++) {
        arrtemp.push(d[i].temp)
    }



    return (
        <Box py={"25px"} className={styled.container} boxShadow="rgba(0, 0, 0, 0.15) 0px 3px 3px 0px">
            <Box mb={"50px"} className={styled.weeklycontainer} >
                {d.map((d) => {
                    return <div className={styled.weeklydiv}>
                        <div>{d.title}</div>
                        <div>{d.temp}°C</div>
                        <div className={styled.imgdiv} >
                            {d.report === "Clear" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                            {d.report === "Smoke" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                            {d.report === "Clouds" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/cloudy.ac49ed24.svg' /> : ""}
                            {d.report === "Sunny" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                            {d.report === "Haze" ? <img className={styled.imglogo} src='	https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg' /> : ""}
                            {d.report === "Rain" ? <img className={styled.imglogo} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMMcQ-BdS-zDq0UY3Z7jLwnHQxtApR4E64TSHxkZaogkGyU04WGp0uKxASLt9IOli1YAU&usqp=CAU' /> : ""}
                        </div>
                        <div>{d.report}</div>

                    </div>
                })}


            </Box>

            <Box w={"80%"} m="auto" >

                <Flex fontSize={"35px"} fontWeight="bold" >{arrtemp[0]}°C
                </Flex >
                <div> <BarChart arrtemp={arrtemp} /></div>




                <Box>

                    <Flex w={"100%"} fontSize="18px" mt={"30px"} justifyContent={"space-between"} >
                        <Box w={"100%"} mr={5} h={"30%"} backgroundColor="rgb(243,251,255)">
                            Pressure<br />
                            {pressure} hpa</Box>
                        <Box w={"100%"} ml={5} backgroundColor="rgb(243,251,255)" h={"30%"}>Humidity<br />
                            {humidity} %</Box>
                    </Flex>
                    <Flex justifyContent={"space-between"} mt="30px" fontSize="18px" textAlign="center">
                        <Box h={"40px"}>Sunrise
                            <br />
                            {convertTime(sunrise)}am</Box>
                        <Box h={"40px"}>Sunset
                            <br />
                            {convertTime(sunset)}pm</Box>
                    </Flex>

                    <Img w={"100%"} mt="25px" src='./pic.png' />

                </Box>

            </Box>



        </Box>
    )
}

export default Weeklyforecast