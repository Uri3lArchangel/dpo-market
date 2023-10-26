import Chart, {
  ChartConfiguration,
} from "chart.js/auto";


let chart:Chart
export const ChartInit = (
  ctx: CanvasRenderingContext2D,
  config:ChartConfiguration
) => {
const canvas = ctx.canvas
const canvasId=canvas.id

const chartInstance = Chart.getChart(canvasId)
if(chartInstance) chartInstance.destroy()

chart = new Chart(ctx,config)
  return chart
};
