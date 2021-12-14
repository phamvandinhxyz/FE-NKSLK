import React, { useState } from 'react'
import { Button, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import axios from 'axios';



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
    '& .MuiTextField-root': { m: 1, width: '30ch' },
  };

export default function ModalPage({title, isOpen, onClose, total, userDetail, idUser}) {
    const[name, setName] = useState('');
    const[birth, setBirth] = useState('');
    const[sex, setSex] = useState('');
    const[address, setAdress] = useState('');
    const[phongBan, setPhongBan] = useState('');
    const[chucVu, setChucVu] = useState('');
    const[luongBaoHiem, setLuongBaoHiem] = useState('');
    const[luongHopDong, setLuongHopDong] = useState('');

    const oncloseModal = () =>{
      setName("");
      setBirth("");
      setSex("");
      setAdress("");
      setPhongBan("");
      setChucVu("");
      setLuongBaoHiem("");
      setLuongHopDong("")
      onClose()
  }
  const submitData = () => {
    const data = {
        phongBan: phongBan,
        maCongNhan: title==="Chỉnh sửa thông tin" ? idUser : `CN0${total+3}`,
        chucVu: chucVu,
        hoTen: name,
        ngayNamSinh: "1999-05-18",
        gioiTinh: sex,
        luongBaoHiem: luongBaoHiem,
        queQuan: address,
        luongHopDong: luongHopDong,
        gioBatDau: "06:00:00",
        gioKetThuc: "14:00:00",
        maDanhMucCongNhan: "DMCN_R010",
    }
    addEmployee(data)
}
    const addEmployee = (data) => {
      axios.post('http://localhost:8080/api/v1/admin/employees', {...data}
      )
          .then(res => {
              if (res.status) {
                  oncloseModal();
                  alert("Thêm mới công nhân thành công");
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
          onClose={onClose}
        //   onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
              Các trường bắt buộc sẽ có dấu *
            </Typography>
            <div>
              <TextField
                required
                autoFocus="true"
                id="outlined-required"
                label="Tên công nhân"
                onChange={event => {
                  const { value } = event.target;
                  setName(value);
                }}
              />
              <TextField
                required
                id="outlined"
                label="Ngày tháng năm sinh"
                onChange={event => {
                  const { value } = event.target;
                  setBirth(value);
                }}
              />
             <TextField
                required
                id="outlined"
                label="Giới tính"
                onChange={event => {
                  const { value } = event.target;
                  setSex(value);
                }}
              />
               <TextField
                id="outlined"
                label="Địa chỉ"
                onChange={event => {
                  const { value } = event.target;
                  setAdress(value);
                }}
              />
              <TextField
                id="outlined-required"
                label="Phòng ban"
                onChange={event => {
                  const { value } = event.target;
                  setPhongBan(value);
                }}
              />
              <TextField
                id="outlined-required"
                label="Chức vụ"
                onChange={event => {
                  const { value } = event.target;
                  setChucVu(value);
                }}
              />
              <TextField
                required
                id="outlined-required"
                label="Lương bảo hiểm"
                onChange={event => {
                  const { value } = event.target;
                  setLuongBaoHiem(value);
                }}
              />
              <TextField
                required
                id="outlined-required"
                label="Lương hợp đồng"
                onChange={event => {
                  const { value } = event.target;
                  setLuongHopDong(value);
                }}
              />
            </div>
            <Button onClick={() => {submitData()}} variant="contained" style={{marginTop: 20, padding: 10,}}>Hoàn thành</Button>
          </Box>
        </Modal>
      </div>
    )
}
