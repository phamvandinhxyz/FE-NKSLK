import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import searchFill from "@iconify/icons-eva/search-fill";
import {styled} from "@mui/material/styles";
import { sentenceCase } from 'change-case';
import React, { useEffect, useState, useRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import minusOutlined from '@iconify/icons-ant-design/minus-outlined';
import Tooltip from '@mui/material/Tooltip';
import DialogTitle from '@mui/material/DialogTitle';
// material
import {
    Card,
    Table,
    Stack,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    CircularProgress,
    Box, Modal, InputAdornment, OutlinedInput
} from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// eslint-disable-next-line import/no-unresolved
import ModalPage from 'src/components/ModalPage';
// components
import axios from 'axios';
import Page from '../../../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../../../components/Scrollbar';
// import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../components/_dashboard/user'
import ModalDisplayEmployeeEmptyNKSLK from "./ModalDisplayEmployeeEmptyNKSLK";



const TABLE_HEAD = [
    { id: '' },
    { id: 'id', label: 'Mã công nhân', alignRight: false },
    { id: 'name', label: 'Họ tên', alignRight: false },
    { id: 'ngaysinh', label: 'Ngày sinh', alignRight: false },
    { id: 'phongban', label: 'Phòng ban', alignRight: false },
    { id: 'gioitinh', label: 'Giới tính', alignRight: false },
    { id: 'luonghopdong', label: 'Lương hợp đồng', alignRight: false },
    { id: 'luongbaohiem', label: 'Lương bảo hiểm', alignRight: false }
];

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`
    }
}));

function ModalDisplayEmployeeNKSLK(props) {
    const [page, setPage] = useState(0);
    // const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    // const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pageEmployee, setPageEmployee] = useState(1);
    const [productList, setProductList] = useState([]);
    const [titleModal, setTitleModal] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [scroll, setScroll] = useState('paper');
    const totalEmployee = useRef(1);

    const [openNotification, setOpenNotification] = React.useState(false);
    const [notification, setNotification] = React.useState("");



    const navigate = useNavigate();

    const [reload,setReload] = useState(false)


    useEffect(() => {
        getEmployees(props.maDanhMucCongNhan);
    }, [pageEmployee, rowsPerPage,openModal,props.maDanhMucCongNhan,reload])

    const getEmployees = (maDanhMucCongNhan) => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/v1/admin/dmcn/${maDanhMucCongNhan}`,
        })
            .then(res => {
                if(res.status) {
                    totalEmployee.current = res.data.total;
                    setProductList(res.data.data[0].congNhans);
                }
                else {
                    console.log(res.message);
                    alert(res.message);
                }
            })
            .catch(e => {
                console.log("Network Failure!!!", e);
                navigate('/404');
                alert('Không thể kết nối với Internet!!');
            })
    }


    const handleChangePage = (event, newPage) => {
        if(newPage > page){
            setPage(newPage);
            setPageEmployee(pageEmployee + 1);
        }
        else{
            setPage(newPage);
            setPageEmployee(pageEmployee - 1);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setPageEmployee(1);
    };

    const removeFromNKSLK = (cn) => {
        cn.maDanhMucCongNhan = null;
        updateCongNhan(cn)
    };

    const updateCongNhan = (cn) => {
        axios.put("http://localhost:8080/api/v1/admin/employees",{...cn}
        )
            .then(res => {
                if (res.status) {
                    setReload(!reload)
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalEmployee.current) : 0;

    return(
        <div>
            <ModalDisplayEmployeeEmptyNKSLK maDanhMucCongNhan={props.maDanhMucCongNhan} visible={openModal} onClose={()=>{setOpenModal(!openModal)}} />
            <Dialog
                open={props.visible}
                onClose={()=>{props.onClose();props.updateQuantityEmployee()}}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="lg"
            >
                {/* <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle> */}
                <DialogContent dividers={scroll === 'paper'}
                >
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                    <Typography variant="h4" gutterBottom>
                                        Danh sách công nhân thực hiện NKSLK
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component={RouterLink}
                                        onClick={() => {setOpenModal(true);}}
                                        to="#"
                                        startIcon={<Icon icon={plusFill} />}
                                    >
                                        Thêm công nhân vào NKSLK
                                    </Button>
                                </Stack>

                                <Card>
                                    <SearchStyle
                                        style={{marginTop:"10px",marginLeft:"10px"}}
                                        placeholder="Search ..."
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                                            </InputAdornment>
                                        }
                                    />
                                    {
                                        totalEmployee.current > 1
                                            ?
                                            <TablePagination
                                                labelRowsPerPage="Số sản phẩm mỗi trang"
                                                rowsPerPageOptions={[5, 10, 25]}
                                                component="div"
                                                count={totalEmployee.current}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                            :
                                            <Box sx={{ display: 'flex',justifyContent:'end', padding: 2}}>
                                                <CircularProgress size={20} color="inherit"/>
                                            </Box>
                                    }
                                    <Scrollbar>
                                        <TableContainer sx={{ maxWidth: 2000, minWidth: 1000 }}>
                                            <Table>
                                                <UserListHead
                                                    // order={order}
                                                    // orderBy={orderBy}
                                                    headLabel={TABLE_HEAD}
                                                    // rowCount={USERLIST.length}
                                                    // numSelected={selected.length}
                                                    // onRequestSort={handleRequestSort}
                                                />
                                                <TableBody>
                                                    {productList
                                                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((product) => {
                                                            const { maCongNhan, hoTen, ngayNamSinh, phongBan, gioiTinh, luongHopDong, luongBaoHiem } = product;
                                                            // const isItemSelected = selected.indexOf(name) !== -1;

                                                            return (
                                                                <TableRow
                                                                    key={maCongNhan}
                                                                >
                                                                    <TableCell style={{cursor: "pointer"}} onClick={()=>{removeFromNKSLK(product)}} > <Tooltip title="Xoá công nhân khỏi NKSLK" ><Icon icon={minusOutlined} /></Tooltip> </TableCell>
                                                                    <TableCell align="left">{maCongNhan}</TableCell>
                                                                    <TableCell align="left">{hoTen}</TableCell>
                                                                    <TableCell align="left">{ngayNamSinh}</TableCell>
                                                                    <TableCell align="left">{phongBan}</TableCell>
                                                                    <TableCell align="left">{gioiTinh}</TableCell>
                                                                    <TableCell align="left">{luongHopDong}</TableCell>
                                                                    <TableCell align="left">{luongBaoHiem}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 53 * emptyRows }}>
                                                            <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Scrollbar>
                                </Card>
                    </DialogContentText>
                </DialogContent>
                {/* DialogActions> */}
                {/* </DialogActions> */}
            </Dialog>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openNotification} autoHideDuration={6000} onClose={()=>{setOpenNotification(false)}}>
                    <Alert onClose={()=>{setOpenNotification(false)}} severity={notification} sx={{ width: '100%' }}>
                        Remove {notification}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}
export default ModalDisplayEmployeeNKSLK