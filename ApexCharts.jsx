import React from 'react';
import ReactApexChart from 'react-apexcharts';
import exceldata from './Exceldata.jsx';
const ApexChart = () => {
        const [state, setState] = React.useState({

            series: [{
              data: exceldata,
            }],
            options: {
              chart: {
                type: 'candlestick',
                height: 350
              },
              title: {
                text: 'CandleStick Chart',
                align: 'left'
              },
              xaxis: {
                type: 'datetime'
              },
              yaxis: {
                tooltip: {
                  enabled: true
                }
              }
            },


        });



        return (
          <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="candlestick" height={350} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
      }
export default ApexChart;