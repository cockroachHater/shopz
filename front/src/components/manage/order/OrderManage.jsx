import Container from "react-bootstrap/Container";
import useAuthCheck from "../../../hooks/login/useAuthCheck";
import { useEffect, useState } from "react";
import { appUrl } from "../../../api/appUrl";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export default function OrderManage() {
  const [userName, authCheck] = useAuthCheck();
  const [orderInfo, setOrderInfo] = useState([
    {
      userSeq: 0,
      userName: "",
      orderSeq: 0,
      oDate: "",
      postCode: "",
      address: "",
      addressDetail: "",
      oStatus: "",
      orderItemSeq: 0,
      counts: 0,
      productSeq: 0,
      productName: "",
      price: 0,
      img: "",
      stock: 0,
    },
  ]);
  useEffect(() => {
    authCheck();
    if (authCheck() != -1) {
      appUrl
        .get("/allOrderList")
        .then((res) => {
          setOrderInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [setOrderInfo]);
  //paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = orderInfo;
  return (
    <Container className="manageComponentTable">
      <div className="title_text">주문 관리</div>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>주문번호</TableCell>
                <TableCell>회원이름</TableCell>
                <TableCell>주문날짜</TableCell>
                <TableCell>주소</TableCell>
                <TableCell>상품이름</TableCell>
                <TableCell>상품갯수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, i) => (
                    <TableRow key={i} tabIndex={-1}>
                      <TableCell>{order.orderSeq}</TableCell>
                      <TableCell>{order.userName}</TableCell>
                      <TableCell>{order.odate}</TableCell>
                      <TableCell>
                        ({order.postCode})<br />
                        {order.address}
                        <br />
                        {order.addressDetail}
                      </TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.counts}개</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
