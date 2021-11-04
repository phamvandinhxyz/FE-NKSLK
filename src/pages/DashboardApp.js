// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import axios from "axios";
import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import Page from '../components/Page';

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import SalaryProductMax from "../components/_dashboard/app/SalaryProductMax";
import SalaryProductMin from "../components/_dashboard/app/SalaryProductMin";
import EmployeeQuantity from "../components/_dashboard/app/EmployeeQuantity";
import ProductQuantity from "../components/_dashboard/app/ProductQuantity";


// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate();
  const [overviewData,setOverviewData] = useState({})

  useEffect(()=>{
    getOverviewDashboard()
  },[])

  const getOverviewDashboard = () =>{
    axios({
      method:'get',
      url:'http://localhost:8080/api/v1/admin/thongke/tongquan',
    }).then((res)=>{
      if(res.data.status){
        setOverviewData(res.data.object)
      }else {
        alert(res.data.message)
      }
    }).catch((err)=>{
      console.log("Network Failure!!!", err);
      navigate('/404');
      alert('Không thể kết nối với Internet!!');
    })
  }

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <SalaryProductMax salaryProductMax={overviewData.luongSanPhamCaoNhat} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SalaryProductMin salaryProductMin={overviewData.luongSanPhamThapNhat} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <EmployeeQuantity employeeQuantity={overviewData.soLuongCongNhan} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProductQuantity productQuantity={overviewData.soLuongSanPham} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
