"use client";


import React, { useEffect } from "react";
import { MainTradingChart } from "../Functions/MainTradingChart";

const Canvas = () => {
useEffect(()=>{
MainTradingChart()
},[])

 
  return (<canvas id="trading_chart" width={"500%"}></canvas>);
};

export default Canvas;
