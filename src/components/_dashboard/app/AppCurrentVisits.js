import { merge } from 'lodash';
import {useEffect, useState} from "react";
import axios from "axios";


import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------


export default function AppCurrentVisits(props) {
  const [chartData,setChartData] = useState([])
  const theme = useTheme();


  useEffect(()=>{
    getSoLuongCongNhanChungRieng()
  },[])


  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: ['Riêng', 'Chung'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });



  const getSoLuongCongNhanChungRieng = () =>{
    axios({
      method:'get',
      url:`http://localhost:8080/api/v1/admin/thongke/soLuongCongNhanChungRieng`,
    }).then((res)=>{
      if(res.data.status){
        setChartData(Object.values(res.data.object))
      }else {
        alert(res.data.message)
      }
    }).catch((err)=>{
      console.log("Network Failure!!!", err);
    })
  }

  return (
    <Card>
      <CardHeader title="Số lượng công nhân" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartData.length > 0 ? chartData : [1,0]} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
