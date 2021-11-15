import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
function DialogDeleteProduct(props) {

    const [openNotification, setOpenNotification] = React.useState(false);
    const [notification, setNotification] = React.useState("");


    useEffect(()=>{
        console.log(props.currentProduct)
    },[props.currentProduct])

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:8080/api/v1/admin/product/{id}/delete`
        )
            .then(res => {
                if (res.status) {
                    props.onClose()
                    setNotification("success")
                    setOpenNotification(true)
                } else {
                    setNotification("error")
                    setOpenNotification(true)
                }
            })
            .catch(e => {
                setNotification("error")
                setOpenNotification(true)
            })
    }

    return(
        <div>
            <Dialog
                open={props.visible}
                onClose={()=>{props.onClose()}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Xoá?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có muốn xoá sản phẩm này
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{deleteProduct(props.currentProduct.product.maSanPham)}} >Xác nhận</Button>
                    <Button onClick={()=>{props.onClose()}} autoFocus>
                        Huỷ
                    </Button>
                </DialogActions>
            </Dialog>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openNotification} autoHideDuration={6000} onClose={()=>{setOpenNotification(false)}}>
                    <Alert onClose={()=>{setOpenNotification(false)}} severity={notification} sx={{ width: '100%' }}>
                        Delete {notification}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}
export  default DialogDeleteProduct