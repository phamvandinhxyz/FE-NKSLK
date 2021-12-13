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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user';
import ModalAddProduct from "./ModalAddProduct";
// import products from 'src/_mocks_/products';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Mã sản phẩm', alignRight: false },
  { id: 'name', label: 'Tên sản phẩm', alignRight: false },
  { id: 'ngaySanXuat', label: 'Ngày sản xuất', alignRight: false },
  { id: 'hanSuDung', label: 'Ngày đăng ký', alignRight: false },
  { id: 'ngayDangKy', label: 'Số đăng ký', alignRight: false },
  { id: 'soDangKy', label: 'Hạn sử dụng', alignRight: false },
  { id: 'quyCach', label: 'Quy cách', alignRight: false },
  { id: '' }
];

function Products() {
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

  const totalEmployee = useRef(1);

  const navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, [pageEmployee, rowsPerPage,openModal])

  const getEmployees = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/v1/admin/products?page=${pageEmployee}&size=${rowsPerPage}`,
    })
        .then(res => {
          if(res.status) {
            totalEmployee.current = res.data.total;
            setProductList(res.data.data);
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

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalEmployee.current) : 0;

  // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  // const isUserNotFound = filteredUsers.length === 0;

  return (
      <Page title="Danh sách sản phẩm">
        <ModalAddProduct total={totalEmployee.current} title={titleModal} isOpen={openModal} onClose={() => setOpenModal(false)}/>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Danh sách sản phẩm
            </Typography>
            <Button
                variant="contained"
                component={RouterLink}
                onClick={() => {setOpenModal(true); setTitleModal("Thêm sản phẩm mới")}}
                to="#"
                startIcon={<Icon icon={plusFill} />}
            >
              Thêm sản phẩm
            </Button>
          </Stack>

          <Card>
            <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                // onFilterName={handleFilterByName}
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
                          const { tenSanPham, maSanPham, ngaySanXuat, soDangKy, hanSuDung, ngayDangKy, quyCach } = product;
                          // const isItemSelected = selected.indexOf(name) !== -1;

                          return (
                              <TableRow
                                  key={maSanPham}
                              >
                                {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {maCongNhan}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                                <TableCell align="left">{maSanPham}</TableCell>
                                <TableCell align="left">{tenSanPham}</TableCell>
                                <TableCell align="left">{ngaySanXuat}</TableCell>
                                <TableCell align="left">{ngayDangKy}</TableCell>
                                <TableCell align="left">{soDangKy}</TableCell>
                                <TableCell align="left">{hanSuDung.split("T")[0]}</TableCell>
                                <TableCell align="left">{quyCach}</TableCell>
                                <TableCell align="right">
                                  <UserMoreMenu idSP = {product.maSanPham} productDetail={product}/>
                                </TableCell>
                              </TableRow>
                          );
                        })}
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
export default Products