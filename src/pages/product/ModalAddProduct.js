import {Button, Modal, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from "axios";

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


function ModalAddProduct({total, title, isOpen, onClose, productDetail}) {

    const [maSanPham, setMaSanPham] = useState('');
    const [tenSanPham, setTenSanPham] = useState('');
    const [ngaySanXuat, setNgaySanXuat] = useState('');
    const [hanSuDung, setHanSuDung] = useState('');
    const [ngayDangKy, setNgayDangKy] = useState('');
    const [soDangKy, setSoDangKy] = useState('');
    const [quyCach, setQuyCach] = useState('');
    // console.log(productDetail);

    const oncloseModal = () =>{
        setMaSanPham('')
        setTenSanPham('')
        setNgaySanXuat('')
        setNgayDangKy('')
        setHanSuDung('')
        setSoDangKy('')
        setQuyCach('')
        onClose()
    }

    function convertToDateSql(date){
        return new Date(date).toISOString().split('T')[0]
    };

    const submitData = () => {
        const data = {
            maSanPham: `TTSP${total+1}`,
            tenSanPham: tenSanPham,
            ngaySanXuat: ngaySanXuat,
            hanSuDung: hanSuDung,
            ngayDangKy: ngayDangKy,
            soDangKy: soDangKy,
            quyCach: quyCach,
        }
        addEmployee(data)
    }

    const addEmployee = (data) => {
        axios.post('http://localhost:8080/api/v1/admin/products', {...data}
        )
            .then(res => {
                if (res.status) {
                    oncloseModal()
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

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={()=>{oncloseModal()}}
                //   onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2, mb: 2}}>
                        Các trường bắt buộc sẽ có dấu *
                    </Typography>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Tên sản phẩm"
                            defaultValue="kfkdjfljkshfsdjhgfkj"
                            onChange={event => {
                                const {value} = event.target;
                                setTenSanPham(value);
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Ngày sản xuất"
                                value={ngaySanXuat}
                                onChange={(newValue) => {
                                    setNgaySanXuat(convertToDateSql(newValue))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Hạn sử dụng"
                                value={hanSuDung}
                                onChange={(newValue) => {
                                    setHanSuDung(convertToDateSql(newValue))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Ngày đăng ký"
                                value={ngayDangKy}
                                onChange={(newValue) => {
                                    setNgayDangKy(convertToDateSql(newValue))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            id="outlined-required"
                            label="Số đăng ký"
                            onChange={event => {
                                const {value} = event.target;
                                setSoDangKy(value);
                            }}
                        />
                        <TextField
                            id="outlined-required"
                            label="Quy cách"
                            onChange={event => {
                                const {value} = event.target;
                                setQuyCach(value);
                            }}
                        />

                    </div>
                    <Button onClick={()=>{submitData()}} variant="contained"
                            style={{marginTop: 20, padding: 10,}}>Hoàn thành</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalAddProduct