import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useEffect, useState, useRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
    Box
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import ModalPage from 'src/components/ModalPage';
// components
import axios from 'axios';
import Page from '../../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../../components/Scrollbar';
// import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserMoreMenu } from '../../components/_dashboard/user';
import ModalAddProduct from "../product/ModalAddProduct";
import SearchNKSLKComponent from "./SearchNKSLKComponent";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'Mã NKSLK', alignRight: false },
    { id: 'ngayThucHien', label: 'Ngày thự hiện', alignRight: false },
    { id: 'tenCongViec', label: 'Tên công việc', alignRight: false },
    { id: 'soCongNhan', label: 'Số công nhân', alignRight: false },
    { id: 'gioBatDau', label: 'Giờ bắt đầu', alignRight: false },
    { id: 'gioKetThuc', label: 'Giờ kết thúc', alignRight: false },
    { id: '' }
];

function NKSLK() {
    const [page, setPage] = useState(0);
    // const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    // const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pageNKSLK, setPageNKSLK] = useState(1);
    const [pageNKSLKSearchResult, setPageNKSLKSearchResult] = useState(0);
    const [NKSLKInfoList, setNKSLKInfoList] = useState([]);
    const [titleModal, setTitleModal] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [NKSLKResultSearch, setNKSLKResultSearch] = useState(null);

    const [keySearch,setKeySearch] = useState("")

    const totalRecord = useRef(1);

    const navigate = useNavigate();

    useEffect(() => {
        getEmployees();
    }, [pageNKSLK, rowsPerPage,openModal])


    useEffect(() => {
        if(keySearch !== ""){
            searchNKSLKReLoad(keySearch)
        }
    }, [pageNKSLKSearchResult, rowsPerPage,openModal])

    const getEmployees = () => {
        axios({
            method: 'get',
            url: `http://localhost:8080/api/v1/admin/nkslk?page=${pageNKSLK}&size=${rowsPerPage}`,
        })
            .then(res => {
                if(res.status) {
                    totalRecord.current = res.data.total;
                    setNKSLKInfoList(res.data.data);
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

    const searchNKSLK = (id) => {
        if(id !== ""){
            setKeySearch(id)
            axios.get(`http://localhost:8080/api/v1/admin/nkslk/${id}/search`
            )
                .then(res => {
                    if (res.status) {
                        totalRecord.current = res.data.total;
                        setNKSLKResultSearch(res.data.data)
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
        else {
            setNKSLKResultSearch(null)
            getEmployees()
        }
    }

    const searchNKSLKReLoad = (id) => {
            axios.get(`http://localhost:8080/api/v1/admin/nkslk/${id}/search?page=${pageNKSLKSearchResult}&size=${rowsPerPage}`
            )
                .then(res => {
                    if (res.status) {
                        totalRecord.current = res.data.total;
                        setNKSLKResultSearch(res.data.data)
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


    const handleChangePage = (event, newPage) => {
        if(newPage > page){
            setPage(newPage);
            setPageNKSLK(pageNKSLK + 1);
            setPageNKSLKSearchResult(pageNKSLKSearchResult + 1);
        }
        else{
            setPage(newPage);
            setPageNKSLK(pageNKSLK - 1);
            setPageNKSLKSearchResult(pageNKSLKSearchResult - 1);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setPageNKSLK(1);
    };

    // const handleFilterByName = (event) => {
    //   setFilterName(event.target.value);
    // };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalRecord.current) : 0;

    // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    // const isUserNotFound = filteredUsers.length === 0;

    return (
        <Page title="Danh sách NKSLK">
            <ModalAddProduct total={totalRecord.current} title={titleModal} isOpen={openModal} onClose={() => setOpenModal(false)}/>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Danh sách NKSLK
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        onClick={() => {setOpenModal(true); setTitleModal("Thêm sản phẩm mới")}}
                        to="#"
                        startIcon={<Icon icon={plusFill} />}
                    >
                        Thêm NKSLK
                    </Button>
                </Stack>

                <Card>
                    <SearchNKSLKComponent
                        numSelected={selected.length}
                        filterName={filterName}
                        onSearch={(id)=>{searchNKSLK(id)}}
                        // onFilterName={handleFilterByName}
                    />
                    {
                        totalRecord.current > 0
                            ?
                            <TablePagination
                                labelRowsPerPage="Số sản phẩm mỗi trang"
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={totalRecord.current}
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
                                    {
                                        NKSLKResultSearch !==  null ?
                                            NKSLKResultSearch
                                                .map((nk) => {
                                                    const { nkslk, danhMucCongViec, congNhans} = nk;
                                                    return (
                                                        <TableRow
                                                            key={nkslk.maNKSLK}
                                                            hover='true'
                                                            onClick={()=>{alert(nkslk.maNKSLK)}}
                                                        >
                                                            <TableCell align="left">{nkslk.maNKSLK}</TableCell>
                                                            <TableCell align="left">{nkslk.ngayThucHien}</TableCell>
                                                            <TableCell align="left">{danhMucCongViec !== null ? danhMucCongViec.tenCongViec : null }</TableCell>
                                                            <TableCell align="left">{congNhans.length}</TableCell>
                                                            <TableCell align="left">{nkslk.gioBatDau}</TableCell>
                                                            <TableCell align="left">{nkslk.gioKetThuc}</TableCell>
                                                            <TableCell align="right">
                                                                <UserMoreMenu />
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            :
                                            NKSLKInfoList
                                                .map((nk) => {
                                                    const { nkslk, danhMucCongViec, congNhans} = nk;
                                                    return (
                                                        <TableRow
                                                            key={nkslk.maNKSLK}
                                                            hover='true'
                                                        >
                                                            <TableCell onClick={()=>{alert(nkslk.maNKSLK)}} align="left">{nkslk.maNKSLK}</TableCell>
                                                            <TableCell onClick={()=>{alert(nkslk.maNKSLK)}} align="left">{nkslk.ngayThucHien}</TableCell>
                                                            <TableCell onClick={()=>{alert(nkslk.maNKSLK)}} align="left">{danhMucCongViec !== null ? danhMucCongViec.tenCongViec : null }</TableCell>
                                                            <TableCell onClick={()=>{alert(nkslk.maNKSLK)}} align="left">{congNhans.length}</TableCell>
                                                            <TableCell onClick={()=>{alert(nkslk.maNKSLK)}} align="left">{nkslk.gioBatDau}</TableCell>
                                                            <TableCell onClick={()=>{alert(nkslk.maNKSLK)}} align="left">{nkslk.gioKetThuc}</TableCell>
                                                            <TableCell align="right">
                                                                <UserMoreMenu />
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                    }
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
        </Page>
    );
}
export default NKSLK