import { ChartInit } from "@/src/charts/chartMainConfig";
import { ChartConfiguration, ChartData } from "chart.js";

const max=10
const datasetData=Array.from(Array(max).keys())
const secMax = 10
const labels=Array.from(Array(secMax).keys())

export const MainTradingChart = ()=>{
    let canvas = document.getElementById("trading_chart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const data:ChartData={
        labels,
        datasets:[{
            label:"Price",
            data:datasetData,
            fill:true,
            tension:0
            
            }]
    }

    const config:ChartConfiguration={
        type:"bar",
        data,
        options:{
            scales:{
                x:{
                    offset:true,
                    ticks:{
                        font:{
                            size:10
                        },color:"#000"
                    }
                },y:{
                    ticks:{
                        font:{
                            size:10
                        },color:"#000"
                    }
                }
            }
            ,    plugins:{
            
                legend:{
                    
                    labels:{
                    
                        font:{
                            size:20
                        },color:'black'
                    }
                }
               }
        }
    }

    ChartInit(ctx,config)
}