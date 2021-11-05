import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits(props) {

  const CHART_DATA = [
    // {
    //   name: 'Team A',
    //   type: 'column',
    //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30,77]
    // },
    // {
    //   name: 'Team B',
    //   type: 'area',
    //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43,99]
    // },
    {
      name: 'Lương công nhân',
      type: 'line',
      data: Object.values(props.luongCongNhanTrongNam).slice(0,new Date().getMonth())
    }
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3] },
    // stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2021',
      '02/01/2021',
      '03/01/2021',
      '04/01/2021',
      '05/01/2021',
      '06/01/2021',
      '07/01/2021',
      '08/01/2021',
      '09/01/2021',
      '10/01/2021',
      '11/01/2021',
      '12/01/2021'
    ],
    min: new Date('01/01/2021').getTime(),
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'], },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'VND'}).format(y.toFixed(0))}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Lương công nhân trong năm" subheader={`${new Date().getFullYear()}`} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
