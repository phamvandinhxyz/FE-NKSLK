/* eslint-disable import/no-unresolved */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import ModalAddProduct from 'src/pages/product/ModalAddProduct';
import ModalPage from 'src/components/ModalPage';

// ----------------------------------------------------------------------

export default function UserMoreMenu({idSP, productDetail, idUser, userDetail, title}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  console.log(userDetail);

  return (
    <>
      {title === "Chỉnh sửa thông tin" ? <ModalPage title={title} isOpen={openModal} onClose={() => setOpenModal(false)} userDetail={userDetail} idUser={idUser} /> : <ModalAddProduct title= {title === "Chỉnh sửa thông tin" ? title : "ChangeProductDetail"} productDetail={productDetail} isOpen={openModal} onClose={() => setOpenModal(false)}/>}
      
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} onClick={()=>{alert( title === "Chỉnh sửa thông tin" ?`Đã xoá nhân viên có mã ${idUser}` :`Đã xoá sản phẩm có mã ${idSP}`);}} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} onClick={()=>{setOpenModal(true); console.log(productDetail);}} />
        </MenuItem>
      </Menu>
    </>
  );
}
