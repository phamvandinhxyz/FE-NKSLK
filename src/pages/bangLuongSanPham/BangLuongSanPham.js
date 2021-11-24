import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Button, Card,
    Container, Stack,Typography,
} from "@mui/material";
import Page from "../../components/Page";
import FilterBLSPComponent from "./FilterBLSPComponent";



const columns = [
    { field: 'maCongNhan', headerName: 'Mã công nhân', width: 130 },
    { field: 'maCongViec', headerName: 'Mã công việc', width: 130 },
    { field: 'ngayThucHien', headerName: 'Ngày thực hiện', width: 130 },
    { field: 'hoTen', headerName: 'Họ tên', width: 130 },
    { field: 'phongBan', headerName: 'Phòng ban', width: 130 },
    { field: 'chucVu', headerName: 'Chức vụ', width: 130 },
    { field: 'maDanhMucCongNhan', headerName: 'Mã DMCN', width: 130 },
    { field: 'bangLuong', headerName: 'Bảng lương', width: 130,
        renderCell: params => new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'VND',minimumFractionDigits: 2}).format(params.value)
    },
];

function BangLuongSanPham() {
    const [data,setData] = useState([])

    useEffect(()=>{
        getBangLuongSanPham()
    },[])

    const getBangLuongSanPham = () =>{
        axios.get(`http://localhost:8080/api/v1/admin/thongke/bangLuongSanPham`
        )
            .then(res => {
                if (res.status) {
                    setData(res.data.data)
                } else {
                    console.log(res.message);
                    alert(res.message);
                }
            })
            .catch(e => {
                console.log("Network Failure!!!", e);
                alert('Không thể kết nối với Internet!!');
            })
    }

    const filterNKSLK = (type,s) => {
        if(s !== ""){
            axios.get(`http://localhost:8080/api/v1/admin/thongke/${type}/${s}/bangLuongSanPham`
            )
                .then(res => {
                    if (res.status) {
                        setData(res.data.data)
                    } else {
                        console.log(res.message);
                        alert(res.message);
                    }
                })
                .catch(e => {
                    console.log("Network Failure!!!", e);
                    alert('Không thể kết nối với Internet!!');
                })
        }
    }

    return (
        <Page title="Bảng lương sản phẩm">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Danh sách sản phẩm
                    </Typography>
                </Stack>

                <Card>
                        <Card>
                            <FilterBLSPComponent onFilter={(type,s)=>{filterNKSLK(type,s)}} getBangLuongSanPham={()=>{getBangLuongSanPham()}} />
                            <div style={{marginTop:'40px',height: 650, width: '100%' }}>
                                <DataGrid
                                    style={{borderTop: 'none'}}
                                    rows={data}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    getRowId={(row) => Math.random()}
                                />
                            </div>
                        </Card>
                </Card>
            </Container>
        </Page>
    );
}
export default BangLuongSanPham