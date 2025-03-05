import { Helmet } from "react-helmet-async";
import { Fragment, useEffect, useState } from "react";
import useAuthCheck from "../../hooks/login/useAuthCheck";
import Container from "react-bootstrap/Container";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { appUrl } from "../../api/appUrl";

export default function Order() {
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
  const [removeDinfo, setRemoveDinfo] = useState([
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
        .post("/orderList", null, {
          params: { user_seq: localStorage.getItem("seq") },
        })
        .then((res) => {
          setOrderInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [setOrderInfo]);

  useEffect(() => {
    const arr = orderInfo.filter(
      (val, idx, self) =>
        idx === self.findIndex((t) => t.orderSeq === val.orderSeq),
    );
    setRemoveDinfo(arr);
  }, [orderInfo]);

  const rows = removeDinfo;

  return (
    <>
      <Helmet>
        <title>주문내역</title>
      </Helmet>
      <div className="title_text">주문내역</div>
      <Container>
        <Paper sx={{ width: "100%" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>주문번호</TableCell>
                <TableCell>주문 날짜</TableCell>
                <TableCell>주문 상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, i) => (
                  <TestRow
                    key={i}
                    seq={row.orderSeq}
                    date={row.odate}
                    status={row.ostatus}
                    order={orderInfo}
                    postCode={row.postCode}
                    address={row.address}
                    addressDetail={row.addressDetail}
                  />
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
}

function TestRow(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <>⬆️</> : <>⬇️</>}
          </IconButton>
        </TableCell>
        <TableCell>{props.seq}</TableCell>
        <TableCell>{props.date}</TableCell>
        <TableCell>{props.status}</TableCell>
      </TableRow>
      <RowThree
        open={open}
        order={props.order}
        seq={props.seq}
        postCode={props.postCode}
        address={props.address}
        addressDetail={props.addressDetail}
      />
    </>
  );
}

function RowThree(props) {
  const awsurl =
    "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/product/";
  const [info, setInfo] = useState([{}]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let result = props.order.filter((arr) => arr.orderSeq === props.seq);
    setInfo(result);
  }, [props]);

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < info.length; i++) {
      temp = temp + info[i].price * info[i].counts;
    }
    setTotal(temp);
  }, [info]);

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>상품 이미지</b>
                  </TableCell>
                  <TableCell>
                    <b>상품 이름</b>
                  </TableCell>
                  <TableCell>
                    <b>개당 가격 / 상품 갯수</b>
                  </TableCell>
                  <TableCell align={"right"}>
                    <b>가격</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {info &&
                  info.map((info, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <img
                          src={awsurl + info.img}
                          className={"productListImg"}
                        />
                      </TableCell>
                      <TableCell>{info.productName}</TableCell>
                      <TableCell>
                        {info.price}원 / {info.counts}개
                      </TableCell>
                      <TableCell>{info.price * info.counts}원</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell>
                    <b>배송지 주소 :</b>
                  </TableCell>
                  <TableCell colSpan={2}>
                    ({props.postCode}){props.address}/{props.addressDetail}
                  </TableCell>
                  <TableCell align={"right"}>
                    <b>총 가격 {total}원</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
