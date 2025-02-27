import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button, Typography } from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import { appUrl } from "../../api/appUrl";
import count from "../../store/testSlice";

export default function OrderDirectModal(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  //address info
  const [post, setPost] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  useEffect(() => {
    setPost("");
    setAddress("");
    setShow(false);
  }, [props.handleClose]);

  const handleComplete = (data) => {
    setPost(data.zonecode);
    setAddress(data.address);
    setShow(false);
  };

  function openKakaoApi() {
    setShow(true);
  }

  const handleOrder = async () => {
    appUrl
      .post("/directOrder", null, {
        params: {
          user_seq: localStorage.getItem("seq"),
          post_code: post,
          address: address,
          address_detail: addressDetail,
          product_seq: props.productInfo.product_seq,
          product_count: props.counts,
        },
      })
      .then((res) => {
        if (res.data === "ok") {
          console.log(res.data);
          alert("주문이 완료 되었습니다.");
          navigate("/order");
        } else {
          alert("ERROR...");
        }
      })
      .catch((err) => console.log(err));
    props.handleClose();
  };

  return (
    <Modal
      size={"md"}
      show={props.show}
      onHide={props.handleClose}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>주문 정보 작성</Modal.Title>
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

        <Typography variant={"p"}>
          {props.productInfo.product_name} / {props.productInfo.price} *{" "}
          {props.counts}개 = {props.productInfo.price * props.counts}원
          <br />
        </Typography>

        <Typography variant={"h6"}>
          총 {props.productInfo.price * props.counts}원
        </Typography>

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
