import { Helmet } from "react-helmet-async";
import useAuthCheck from "../../hooks/login/useAuthCheck";
import { useEffect, useState } from "react";
import { appUrl } from "../../api/appUrl";
import {
  Button,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Container from "react-bootstrap/Container";
import CartUpdateModal from "./CartUpdateModal";
import OrderDetailModal from "./OrderDetailModal";

export default function Cart() {
  const [userName, authCheck] = useAuthCheck();

  const awsurl =
    "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/product/";
  const [cartInfo, setCartInfo] = useState([
    {
      id: 0,
      cartSeq: 0,
      productSeq: 0,
      userSeq: 0,
      userName: "",
      productName: "",
      img: "",
      price: 0,
      productCounts: 0,
    },
  ]);
  const seq = localStorage.getItem("seq");
  useEffect(() => {
    authCheck();
    if (authCheck() != -1) {
      appUrl
        .post("/cartList", null, {
          params: { user_seq: seq },
        })
        .then((res) => {
          setCartInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [setCartInfo]);
  const [cart, setCart] = useState([
    {
      cartSeq: 0,
      productSeq: 0,
      userSeq: 0,
      userName: "",
      productName: "",
      img: "",
      price: 0,
      productCounts: 0,
    },
  ]);
  const [orderList, setOrderList] = useState([{}]);

  //checked product counts
  const [counts, setCounts] = useState(0);
  //checked product prices
  const [prices, setPrices] = useState(0);
  //checked array
  const [checkedArray, setCheckedArray] = useState([
    {
      id: 0,
      checkedCounts: 0,
      checkedPrices: 0,
    },
  ]);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

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
  const rows = cartInfo;

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id, productCounts, productPrice) => {
    // 체크된 계산값
    const values = {
      id: id,
      checkedCounts: productCounts,
      checkedPrices: productPrice,
    };

    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
      setCheckedArray((prev) => [...prev, values]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
      setCheckedArray(checkedArray.filter((el) => el.id !== values.id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      const values = [
        {
          id: 0,
          checkedCounts: 0,
          checkedPrices: 0,
        },
      ];
      cartInfo.forEach((el) => idArray.push(el.cartSeq));
      setCheckItems(idArray);
      cartInfo.forEach((el) =>
        values.push({
          id: el.cartSeq,
          checkedCounts: el.productCounts,
          checkedPrices: el.price,
        }),
      );
      setCheckedArray(values);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
      setCheckedArray([]);
      setPrices(0);
    }
  };

  useEffect(() => {
    let allPrices = 0;
    for (let i = 0; i < checkedArray.length; i++) {
      allPrices +=
        checkedArray[i].checkedCounts * checkedArray[i].checkedPrices;
      setPrices(allPrices);
    }
    setCounts(checkItems.length);
  }, [checkItems, checkedArray]);

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showOrder, setShowOrder] = useState(false);
  const handleCloseOrder = () => setShowOrder(false);
  const handleShowOrder = () => setShowOrder(true);

  const getCartInfo = async (cartSeq) => {
    const result = await appUrl
      .post("/cartProductDetail", null, { params: { cartSeq: cartSeq } })
      .then((res) => {
        setCart(res.data[0]);
      })
      .catch((err) => console.log(err));
    handleShow();
  };
  const handleDelete = async (checkItems) => {
    const result = await appUrl
      .post("/cartProductDelete", null, {
        params: { cartSeq: checkItems.join(",") },
      })
      .then((res) => {
        if (res.data === "ok") {
          window.location.reload();
        } else {
          alert("ERROR!");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleOrder = async (checkItems) => {
    const result = await appUrl
      .post("/cartProductOrder", null, {
        params: { cartSeq: checkItems.join(",") },
      })
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => console.log(err));
    handleShowOrder();
  };

  return (
    <>
      <Helmet>
        <title>장바구니</title>
      </Helmet>
      <div className="title_text">장바구니</div>
      <Container>
        <Paper sx={{ width: "100%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      className={`select-${cartInfo.cartSeq}`}
                      checked={
                        checkItems.length === cartInfo.length ? true : false
                      }
                    ></Checkbox>
                  </TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>상품 이름</TableCell>
                  <TableCell>상품 갯수</TableCell>
                  <TableCell>상품 가격</TableCell>
                  <TableCell>가격</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((cart, i) => (
                      <TableRow key={i} tabIndex={-1}>
                        <TableCell>
                          <Checkbox
                            onChange={(e) =>
                              handleSingleCheck(
                                e.target.checked,
                                cart.cartSeq,
                                cart.productCounts,
                                cart.price,
                              )
                            }
                            checked={
                              checkItems.includes(cart.cartSeq) ? true : false
                            }
                            value={cart.cartSeq}
                          ></Checkbox>
                        </TableCell>
                        <TableCell>
                          <img
                            src={awsurl + cart.img}
                            className={"productListImg"}
                          />
                        </TableCell>
                        <TableCell>{cart.productName}</TableCell>
                        <TableCell>
                          {cart.productCounts}개<br />
                          <Button
                            variant={"outlined"}
                            size={"small"}
                            onClick={() => getCartInfo(cart.cartSeq)}
                          >
                            수정
                          </Button>
                        </TableCell>
                        <TableCell>{cart.price}</TableCell>
                        <TableCell>
                          {cart.productCounts * cart.price}원
                        </TableCell>
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
        {counts === 0 ? (
          <Stack direction={"row"} spacing={2}>
            <Button variant={"contained"} disabled>
              선택된 {counts}개 상품 삭제
            </Button>
            <Button variant={"contained"} disabled>
              선택된 {counts}개 상품 주문
            </Button>
          </Stack>
        ) : (
          <Stack direction={"row"} spacing={2}>
            <Button
              variant={"contained"}
              color={"error"}
              onClick={() => handleDelete(checkItems)}
            >
              선택된 {counts}개 상품 삭제
            </Button>
            <Button
              variant={"contained"}
              onClick={() => handleOrder(checkItems)}
            >
              선택된 {counts}개 상품 주문
            </Button>
          </Stack>
        )}

        <p className={"title_text"}>
          선택된 {counts} 개 상품 총 {prices}원{" "}
        </p>
      </Container>

      <CartUpdateModal
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        cart={cart}
        awsurl={awsurl}
      />

      <OrderDetailModal
        show={showOrder}
        handleShow={handleShowOrder}
        handleClose={handleCloseOrder}
        orders={orderList}
        prices={prices}
      />
    </>
  );
}
