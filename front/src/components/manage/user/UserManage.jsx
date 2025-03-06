import Container from "react-bootstrap/Container";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { appUrl } from "../../../api/appUrl";
import UserOrderModal from "./UserOrderModal";
import useAuthCheck from "../../../hooks/login/useAuthCheck";

export default function UserManage() {
  const [userName, authCheck] = useAuthCheck();
  const [userInfo, setUserInfo] = useState([
    {
      user_seq: 0,
      email: "",
      name: "",
      phone: "",
    },
  ]);
  const [userEmail, setUserEmail] = useState("");
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
    appUrl
      .get("/allUserList")
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = userInfo;
  //Modal control(Add)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userOrderList = async (userSeq, userEmail) => {
    await appUrl
      .post("/orderList", null, {
        params: { user_seq: userSeq },
      })
      .then((res) => {
        setOrderInfo(res.data);
      })
      .catch((err) => console.log(err));
    setUserEmail(userEmail);
    handleShow();
  };

  return (
    <Container className="manageComponentTable">
      <div className={"title_text"}>회원별 주문 관리</div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>회원번호</TableCell>
                <TableCell>email</TableCell>
                <TableCell>회원 이름</TableCell>
                <TableCell>핸드폰번호</TableCell>
                <TableCell>주문내역</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, i) => (
                    <TableRow key={i} tabIndex={-1}>
                      <TableCell>{user.user_seq}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Button
                          variant={"outlined"}
                          onClick={() =>
                            userOrderList(user.user_seq, user.email)
                          }
                        >
                          주문내역
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <UserOrderModal
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
        order={orderInfo}
        userEmail={userEmail}
      />
    </Container>
  );
}
