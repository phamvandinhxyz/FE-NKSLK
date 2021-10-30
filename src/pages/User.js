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
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
// import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Mã công nhân', alignRight: false },
  { id: 'name', label: 'Tên công nhân', alignRight: false },
  { id: 'sex', label: 'Giới tính', alignRight: false },
  { id: 'birth', label: 'Ngày sinh', alignRight: false },
  { id: 'phongban', label: 'Phòng ban', alignRight: false },
  { id: 'chucVu', label: 'Chức vụ', alignRight: false },
  { id: 'luongBaoHiem', label: 'Lương bảo hiểm', alignRight: false },
  { id: 'luongHopDong', label: 'Lương hợp đồng', alignRight: false },
  { id: 'gioBatDau', label: 'Giờ bắt đầu', alignRight: false },
  { id: 'gioKetThuc', label: 'Giờ kết thúc', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

export default function User() {
  const [page, setPage] = useState(0);
  // const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  // const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageEmployee, setPageEmployee] = useState(1);
  const [employeeList, setEmployeeList] = useState([]);
  const [titleModal, setTitleModal] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const totalEmployee = useRef(1);

  const navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, [pageEmployee, rowsPerPage])

  const getEmployees = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/v1/admin/employees?page=${pageEmployee}&size=${rowsPerPage}`,
    })
    .then(res => {
      if(res.status) {
        totalEmployee.current = res.data.total;
        setEmployeeList(res.data.data);
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

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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
    <Page title="Danh sách công nhân">
      <ModalPage title={titleModal} isOpen={openModal} onClose={() => setOpenModal(false)}/>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh sách công nhân
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            onClick={() => {setOpenModal(true); setTitleModal("Thêm công nhân mới")}}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm công nhân
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
            labelRowsPerPage="Số công nhân mỗi trang"
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
                  {employeeList
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((employee) => {
                      const { maCongNhan, hoTen, chucVu, gioBatDau, gioKetThuc, gioiTinh, luongBaoHiem, luongHopDong, maDanhMucCongNhan, ngayNamSinh, phongBan } = employee;
                      // const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          key={maCongNhan}
                        >
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {maCongNhan}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                          <TableCell align="left">{maCongNhan}</TableCell>
                          <TableCell align="left">{hoTen}</TableCell>
                          <TableCell align="left">{gioiTinh}</TableCell>
                          <TableCell align="left">{ngayNamSinh !== "1900-01-01" ? ngayNamSinh : "Chưa điền thông tin"}</TableCell>
                          <TableCell align="left">{phongBan}</TableCell>
                          <TableCell align="left">{chucVu}</TableCell>
                          <TableCell align="left">{luongBaoHiem}</TableCell>
                          <TableCell align="left">{luongHopDong}</TableCell>
                          <TableCell align="left">{gioBatDau}</TableCell>
                          <TableCell align="left">{gioKetThuc}</TableCell>
                          <TableCell align="right">
                          <UserMoreMenu />
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
