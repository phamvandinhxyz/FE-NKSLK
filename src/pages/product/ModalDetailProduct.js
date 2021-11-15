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

function ModalDetailProduct(props) {

    const [tenSanPham,setTenSanPham] = useState("")
    const [soDangKi,setSoDangKi] = useState("")
    const [hanSuDung,setHanSuDung] = useState("")
    const [quyCach,setQuyCach] = useState("")
    const [ngayDangKi,setNgayDangKi] = useState("")
    const [ngaySanXuat,setNgaySanXuat] = useState("")

    const [openNotification, setOpenNotification] = React.useState(false);
    const [notification, setNotification] = React.useState("");


    useEffect(()=>{
        if(props.type === "edit"){
            setEdit(false)
        }else {
            setEdit(true)
        }
    },[props.currentProduct])

    const updateProduct = (o) => {
        axios.put(`http://localhost:8080/api/v1/admin/products`,{...o})
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

    function convertToDateSql(date){
        return new Date(date).toISOString().split('T')[0]
    };

    return(
        <div>
            <Modal open={props.visible} onClose={()=>{props.onClose()}}>
                <Box sx={style} component="form">
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom:"30px"}}>
                        Thông tin sản phẩm
                    </Typography>
                    <div style={{marginBottom:"10px"}}>
                        <TextField
                            required
                            autoFocus="true"
                            id="outlined-required"
                            label="Mã Sản Phẩm"
                            disabled="true"
                            value={maSanPham}
                        />
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <TextField
                            required
                            autoFocus="true"
                            id="outlined-required"
                            label="Tên Sản Phẩm"
                            disabled="true"
                            value={tenSanPham}
                        />
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <TextField
                            required
                            autoFocus="true"
                            id="outlined-required"
                            label="Sổ đăng kí"
                            disabled="true"
                            value={soDangKi}
                        />
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <TextField
                            required
                            autoFocus="true"
                            id="outlined-required"
                            label="Hạn sử dụng"
                            disabled="true"
                            value={hanSuDung}
                        />
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <TextField
                            required
                            autoFocus="true"
                            id="outlined-required"
                            label="Tên Sản Phẩm"
                            disabled="true"
                            value={quyCach}
                        />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disabled={edit}
                            label="Ngày đăng kí"
                            value={ngayDangKi}
                            onChange={(newValue) => {
                                setNgayDangKi(convertToDateSql(newValue))
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disabled={edit}
                            label="Ngày sản xuất"
                            value={ngaySanXuat}
                            onChange={(newValue) => {
                                setNgaySanXuat(convertToDateSql(newValue))
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
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
export default ModalDetailProduct