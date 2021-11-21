import React, {useEffect, useState} from "react";
import {Button, Modal, TextField, Typography} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Box} from "@mui/system";
import FormControl from "@mui/material/FormControl";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from "axios";
import ModalDisplayEmployeeNKSLK from "./employee/ModalDisplayEmployeeNKSLK";

const Alert = React.forwardRef((props, ref) => (
     <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    '& .MuiTextField-root': {m: 1, width: '30ch'},
};

function ModalDetailNKSLK(props) {

    const [tenCongViec,setTenCongViec] = useState("")
    const [dinhMucKhoan,setDinhMucKhoan] = useState(0)
    const [heSoKhoan,setHeSoKhoan] = useState(0)
    const [dinhMucLaoDong,setDinhMucLaoDong] = useState(0)
    const [donGia,setDonGia] = useState(0)
    const [edit,setEdit] = useState(true)
    const [calamViec,setCalamViec] = useState(1)
    const [startCa,setStartCa] = useState(	"06:00:00")
    const [endCa,setEndCa] = useState("14:00:00")
    const [ngayThucHien,setNgayThucHien] = useState(null)
    const [maCongViec,setMaCongViec] = useState("")
    const [listMaCongViec,setListMaCongViec] = useState("")
    const [maNKSLK,setMaNKSLK] = useState("")

    const [maDanhMucCongNhan,setMaDanhMucCongNhan] = useState("")
    const [tenDanhMucCongNhan,setTenDanhMucCongNhan] = useState("")
    const [soLuongCongNhan,setSoLuongCongNhan] = useState(0)
    const [listMaCongNhan,setListMaCongNhan] = useState(0)

    const [openNotification, setOpenNotification] = React.useState(false);
    const [notification, setNotification] = React.useState("");

    const [visibleModalEmployee,setVisibleModalEmployee] = useState(false)

    useEffect(()=>{
        if(props.type === "edit"){
            setEdit(false)
        }else {
            setEdit(true)
        }
        if(props.currentNKSLK !== null){
            if(props.currentNKSLK.danhMucCongViec !== null){
                setMaCongViec(props.currentNKSLK.danhMucCongViec.maCongViec)
                setTenCongViec(props.currentNKSLK.danhMucCongViec.tenCongViec)
                setDinhMucKhoan(props.currentNKSLK.danhMucCongViec.dinhMucKhoan)
                setHeSoKhoan(props.currentNKSLK.danhMucCongViec.heSoKhoan)
                setDinhMucLaoDong(props.currentNKSLK.danhMucCongViec.dinhMucLaoDong)
                setDonGia(props.currentNKSLK.danhMucCongViec.donGia)
            }else setMaCongViec(null)

            if(props.currentNKSLK.congNhans.length > 0 ){
                if(props.currentNKSLK.congNhans[0].maDanhMucCongNhan != null){
                    setMaDanhMucCongNhan(props.currentNKSLK.congNhans[0].maDanhMucCongNhan)
                    setSoLuongCongNhan(props.currentNKSLK.congNhans.length)
                }else {
                    setMaDanhMucCongNhan(null)
                    setSoLuongCongNhan(0)
                }
            }else if(props.currentNKSLK.congNhans.length === 0){
                setMaDanhMucCongNhan(props.currentNKSLK.nkslk.danhMucNhanCong)
                setSoLuongCongNhan(props.currentNKSLK.congNhans.length)
            }else
            {
                setMaDanhMucCongNhan(null)
                setSoLuongCongNhan(0)
            }

            setNgayThucHien(props.currentNKSLK.nkslk.ngayThucHien)
            setMaNKSLK(props.currentNKSLK.nkslk.maNKSLK)
        }
    },[props.currentNKSLK])

    useEffect(()=>{
        getDanhMucCongViecs()
    },[])

    useEffect(()=>{
        getDanhMucCongNhans()
    },[])

    const getDanhMucCongViecs = () => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/v1/admin/dmcv`,
        })
            .then(res => {
                if(res.status) {
                    getListMaDMCV(res.data.data)
                }
                else {
                    console.log(res.message);
                    alert(res.message);
                }
            })
            .catch(e => {
                console.log("Network Failure!!!", e);
                alert('Không thể kết nối với Internet!!');
            })
    }

    const getDanhMucCongNhans = () => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/v1/admin/dmcn`,
        })
            .then(res => {
                if(res.status) {
                    getListMaDMCN(res.data.data)
                }
                else {
                    console.log(res.message);
                    alert(res.message);
                }
            })
            .catch(e => {
                console.log("Network Failure!!!", e);
                alert('Không thể kết nối với Internet!!');
            })
    }

    const getDanhMucCongViecById = (id) => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/v1/admin/dmcv/${id}`,
        })
            .then(res => {
                if(res.status) {
                    setMaCongViec(res.data.object.maCongViec)
                    setTenCongViec(res.data.object.tenCongViec)
                    setDinhMucKhoan(res.data.object.dinhMucKhoan)
                    setHeSoKhoan(res.data.object.heSoKhoan)
                    setDinhMucLaoDong(res.data.object.dinhMucLaoDong)
                    setDonGia(res.data.object.donGia)
                }
                else {
                    console.log(res.message);
                    alert(res.message);
                }
            })
            .catch(e => {
                console.log("Network Failure!!!", e);
                alert('Không thể kết nối với Internet!!');
            })
    }


    const getDanhMucCongNhanById = (id) => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/v1/admin/dmcn/${id}`,
        })
            .then(res => {
                if(res.status) {
                    console.log(res.data)
                    setTenDanhMucCongNhan(res.data.data[0].tenDanhMuc === null ? "" : res.data.data[0].tenDanhMuc)
                    setMaDanhMucCongNhan(res.data.data[0].maDanhMucCongNhan)
                    setSoLuongCongNhan(res.data.total)
                }
                else {
                    console.log(res.message);
                    alert(res.message);
                }
            })
            .catch(e => {
                console.log("Network Failure!!!", e);
                alert('Không thể kết nối với Internet!!');
            })
    }
    const updateNKSLK = (o) => {
        axios.put(`http://localhost:8080/api/v1/admin/nkslk`,{...o})
            .then(res => {
                if(res.status) {
                    setNotification("success")
                    setOpenNotification(true)
                }
                else {
                    setNotification("error")
                    setOpenNotification(true)
                }
            })
            .catch(e => {
                setNotification("error")
                setOpenNotification(true)
            })
    }

    const getListMaDMCV = (data) =>{
        const l=[];
        for(let i=0;i<data.length;i+=1 ){
            const label = data[i].maCongViec;
            l.push({label:label,})
        }
        setListMaCongViec([...l])
    }

    const getListMaDMCN = (data) =>{
        const l=[];
        for(let i=0;i<data.length;i+=1 ){
            const label = data[i].maDanhMucCongNhan;
            l.push({label:label,})
        }
        setListMaCongNhan([...l])
    }

    const onChangeTenCongViec = (e) =>{
        setTenCongViec(e.target.value)
    }

    const onChangeDinhMucKhoan = (e) =>{
        setDinhMucKhoan(e.target.value)
    }

    const onChangeCaLamViec = (e) =>{
        setCalamViec(e.target.value)
        switch (e.target.value) {
            case 1:{
                setStartCa("06:00:00")
                setEndCa("14:00:00")
                break;
            }
            case 2:{
                setStartCa("14:00:00")
                setEndCa("22:00:00")
                break;
            }
            case 3:{
                setStartCa("22:00:00")
                setEndCa("06:00:00")
                break;
            }
            default:
                break;
        }
    }


    function convertToDateSql(date){
        return new Date(date).toISOString().split('T')[0]
    };

    const onUpdateNKSLK = () =>{
        setEdit(true);
        const o = {
            maNKSLK: props.currentNKSLK.nkslk.maNKSLK,
            danhMucNhanCong: maDanhMucCongNhan,
            danhMucCongViecDaLam: maCongViec,
            gioKetThuc: endCa,
            gioBatDau: startCa,
            ngayThucHien: ngayThucHien
        }
        updateNKSLK(o)
    }

    const updateQuantityEmployee = (maDMCN) =>{
        getEmployees(maDMCN)
    }

    const getEmployees = (maDanhMucCongNhan) => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/v1/admin/dmcn/${maDanhMucCongNhan}`,
        })
            .then(res => {
                if(res.status) {
                    setSoLuongCongNhan(res.data.data[0].congNhans.length)
                }
                else {
                    console.log(res.message);
                    alert(res.message);
                }
            })
            .catch(e => {
                console.log("Network Failure!!!", e);
                alert('Không thể kết nối với Internet!!');
            })
    }

    return(
        <div>
            {
                maDanhMucCongNhan !== null ?
                    <ModalDisplayEmployeeNKSLK updateQuantityEmployee={()=>{updateQuantityEmployee(maDanhMucCongNhan)}} visible={visibleModalEmployee} maDanhMucCongNhan={maDanhMucCongNhan} onClose={()=>{setVisibleModalEmployee(!visibleModalEmployee)}} />
                    : null
            }
            <Modal open={props.visible} onClose={()=>{props.onClose()}}>
                <Box sx={style} component="form">
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom:"30px"}}>
                        Thông tin nhật ký sản lượng khoán
                    </Typography>
                    <div style={{marginBottom:"10px"}}>
                        <TextField
                            required
                            autoFocus="true"
                            id="outlined-required"
                            label="Mã NKSLK"
                            disabled="true"
                            value={maNKSLK}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disabled={edit}
                                label="Ngày thực hiện"
                                value={ngayThucHien}
                                onChange={(newValue) => {
                                    setNgayThucHien(convertToDateSql(newValue))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <Box sx={{ minWidth: 120,display: "flex",alignItems:"center",margin:"8px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ca làm việc</InputLabel>
                                <Select
                                    disabled={edit}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={calamViec}
                                    label="Ca làm việc"
                                    onChange={(e)=>{onChangeCaLamViec(e)}}
                                >
                                    <MenuItem value={1}>Ca 1</MenuItem>
                                    <MenuItem value={2}>Ca 2</MenuItem>
                                    <MenuItem value={3}>Ca 3</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                autoFocus="true"
                                id="outlined-required"
                                label="Từ"
                                disabled="true"
                                value={startCa}
                            />
                            <TextField
                                required
                                autoFocus="true"
                                id="outlined-required"
                                label="đến"
                                disabled="true"
                                value={endCa}
                            />
                        </Box>

                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Danh mục công việc
                    </Typography>
                    <div style={{marginBottom:"10px"}}>

                                <>
                                    <Autocomplete
                                        style={{display: "contents"}}
                                        disabled={edit}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={listMaCongViec}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Mã công việc" />}
                                        value={maCongViec}
                                        onChange={(event, newValue) => {
                                            if(newValue !== null) getDanhMucCongViecById(newValue.label)
                                            else setMaCongViec("")
                                        }}
                                    />
                                    <TextField
                                        required
                                        autoFocus="true"
                                        id="outlined-required"
                                        label="Tên công việc"
                                        disabled="true"
                                        value={tenCongViec}
                                        onChange={(e)=>{onChangeTenCongViec(e)}}
                                    />
                                    <TextField
                                        type="number"
                                        required
                                        autoFocus="true"
                                        id="outlined-required"
                                        label="Định mức khoán"
                                        disabled="true"
                                        value={dinhMucKhoan}
                                        onChange={(e)=>{onChangeDinhMucKhoan(e)}}
                                    />
                                    <TextField
                                        required
                                        autoFocus="true"
                                        id="outlined-required"
                                        label="Hệ số khoán"
                                        disabled="true"
                                        value={heSoKhoan}
                                    />
                                    <TextField
                                        required
                                        autoFocus="true"
                                        id="outlined-required"
                                        label="Định mức lao động"
                                        disabled="true"
                                        value={dinhMucLaoDong}
                                    />
                                    <TextField
                                        required
                                        autoFocus="true"
                                        id="outlined-required"
                                        label="Đơn giá"
                                        disabled="true"
                                        value={donGia}
                                    />
                                </>

                    </div>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Danh mục công nhân
                    </Typography>
                    <div >
                        <Autocomplete
                            style={{display: "contents"}}
                            disabled={edit}
                            disablePortal
                            id="combo-box-demo"
                            options={listMaCongNhan}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Mã danh mục công nhân" />}
                            value={maDanhMucCongNhan}
                            onChange={(event, newValue) => {
                                if(newValue !== null) getDanhMucCongNhanById(newValue.label)
                                setMaDanhMucCongNhan(null)
                            }}
                        />

                        <TextField
                            id="outlined-required"
                            label="Tên danh mục công nhân"
                            disabled="true"
                            value={tenDanhMucCongNhan}
                        />
                        <TextField
                            id="outlined-required"
                            label="Số lượng công nhân"
                            editabled="true"
                            value={soLuongCongNhan}
                            onClick={()=>{setVisibleModalEmployee(true)}}
                        />
                    </div>
                    {
                        edit === true ?
                            <>
                                <Button variant="contained"
                                        style={{marginTop: 20,marginRight: 20, padding: 10,}} onClick={()=>{setEdit(false)} }>Chỉnh sửa</Button>
                                <Button variant="contained"
                                        style={{marginTop: 20, padding: 10,}} onClick={()=>{props.onClose()} }>Huỷ</Button>
                            </>
                            :
                            <>
                                <Button  variant="contained"
                                         style={{marginTop: 20 ,marginRight: 20, padding: 10,}} onClick={()=>{onUpdateNKSLK()} }>Lưu lại</Button>
                                <Button variant="contained"
                                        style={{marginTop: 20, padding: 10,}} onClick={()=>{setEdit(true)} }>Huỷ</Button>
                            </>


                    }
                </Box>
            </Modal>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openNotification} autoHideDuration={6000} onClose={()=>{setOpenNotification(false)}}>
                    <Alert onClose={()=>{setOpenNotification(false)}} severity={notification} sx={{ width: '100%' }}>
                        Update {notification}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}
export default ModalDetailNKSLK