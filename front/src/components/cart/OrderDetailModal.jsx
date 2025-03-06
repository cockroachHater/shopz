import Modal from "react-bootstrap/Modal";
import { Button, Typography } from "@mui/material";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import DaumPostcode from "react-daum-postcode";
import { useEffect, useState } from "react";
import { appUrl } from "../../api/appUrl";
import { useNavigate } from "react-router-dom";

export default function OrderDetailModal(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  //address info
  const [post, setPost] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [product_seq_list, setProduct_seq_list] = useState([]);
  const [product_count_list, setProduct_count_list] = useState([]);
  const [cart_seq_list, setCart_seq_list] = useState([]);

  useEffect(() => {
    const arr_seq = [];
    const arr_counts = [];
    const arr_cart_seq = [];
    for (let i = 0; i < props.orders.length; i++) {
      arr_seq.push(props.orders[i].productSeq);
      arr_counts.push(props.orders[i].productCounts);
      arr_cart_seq.push(props.orders[i].cartSeq);
    }
    setProduct_seq_list(arr_seq);
    setProduct_count_list(arr_counts);
    setCart_seq_list(arr_cart_seq);
  }, [props.orders]);

  const handleComplete = (data) => {
    setPost(data.zonecode);
    setAddress(data.address);
    setShow(false);
  };

  function openKakaoApi() {
    setShow(true);
  }

  const handleOrder = async () => {
    await appUrl
      .post("/productOrder", null, {
        params: {
          user_seq: localStorage.getItem("seq"),
          post_code: post,
          address: address,
          address_detail: addressDetail,
          product_seq_list: product_seq_list.join(","),
          product_count_list: product_count_list.join(","),
          cart_seq_list: cart_seq_list.join(","),
        },
      })
      .then((res) => {
        if (res.data === "ok") {
          alert("주문이 완료 되었습니다.");
          navigate("/order");
        } else {
          alert("ERROR...");
        }
      })
      .catch((err) => console.log(err));
    props.handleClose();
  };

  useEffect(() => {
    setPost("");
    setAddress("");
    setShow(false);
  }, [props.handleClose]);

  return (
    <Modal size={"md"} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>주문 정보 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel label="우편번호" className="mb-3 mt-3">
          <Form.Control
            type="text"
            autoFocus={true}
            readOnly
            value={post}
            onClick={openKakaoApi}
          />
        </FloatingLabel>
        <FloatingLabel label="주소" className="mb-3 mt-3">
          <Form.Control type="text" value={address} readOnly />
        </FloatingLabel>
        <FloatingLabel label="상세 주소" className="mb-3 mt-3">
          <Form.Control
            type="text"
            onChange={(e) => setAddressDetail(e.target.value)}
          />
        </FloatingLabel>

        <Typography variant={"h6"}>상품 정보 및 수량 확인</Typography>
        {props.orders &&
          props.orders.map((orders, i) => (
            <Typography variant={"p"} key={i}>
              {orders.productName} / {orders.price} * {orders.productCounts}개 ={" "}
              {orders.price * orders.productCounts}원
              <br />
            </Typography>
          ))}
        <Typography variant={"h6"}>총 {props.prices}원</Typography>

        {show && show === true ? (
          <DaumPostcode onComplete={handleComplete} />
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => props.handleClose()}>
          닫기
        </Button>
        {post === "" || addressDetail === "" ? (
          <Button variant="outlined" disabled={true}>
            주문
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleOrder}>
            주문
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
