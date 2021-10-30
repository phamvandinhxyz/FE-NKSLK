import React, { useState } from 'react'
import { Button, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';



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

export default function ModalPage({title, isOpen, onClose}) {
    const[name, setName] = useState('');
    const[birth, setBirth] = useState('');
    const[sex, setSex] = useState('');
    const[address, setAdress] = useState('');
    const[phongBan, setPhongBan] = useState('');
    const[chucVu, setChucVu] = useState('');
    const[luongBaoHiem, setLuongBaoHiem] = useState('');
    const[luongHopDong, setLuongHopDong] = useState('');
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
            <Button onClick={() => alert(`${name},${birth},${sex},${address},${phongBan},${chucVu}, ${luongBaoHiem}, ${luongHopDong},`)} variant="contained" style={{marginTop: 20, padding: 10,}}>Hoàn thành</Button>
          </Box>
        </Modal>
      </div>
    )
}
