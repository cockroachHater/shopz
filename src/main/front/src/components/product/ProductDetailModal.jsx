import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { appUrl } from "../../api/appUrl";
import OrderDirectModal from "./OrderDirectModal";

export default function ProductDetailModal(props) {
  useEffect(() => {
    setCounts(1);
  }, [props.product]);
  const imgUrl =
    "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/product/";
  const seq = localStorage.getItem("seq");
  const [counts, setCounts] = useState(1);
  //dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  //Order-Modal
  const [showOrder, setShowOrder] = useState(false);
  const handleCloseOrder = () => setShowOrder(false);
  const handleShowOrder = () => setShowOrder(true);

  function addCart(productSeq, counts) {
    if (seq && productSeq) {
      appUrl
        .post("/addCart", null, {
          params: { user_seq: seq, product_seq: productSeq, counts: counts },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      handleClickOpen();
    } else {
      alert("로그인 해주세요");
    }
  }
  function directOrder(productSeq, counts) {
    if (seq && productSeq) {
      handleShowOrder();
    } else {
      alert("로그인 해주세요");
    }
  }

  //select
  const handleChange = (e) => {
    setCounts(e.target.value);
  };
  //stock
  const stock = [];
  for (let i = 0; i < props.product.stock; i++) {
    stock.push(
      <MenuItem key={i + 1} value={i + 1}>
        {i + 1}
      </MenuItem>,
    );
  }

  return (
    <>
      <Modal size="lg" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.product.product_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3 modalDiv" controlId="productName">
            <img
              className={"productDetailImg"}
              src={imgUrl + props.product.img}
            ></img>
            <Typography variant="h5">₩ {props.product.price}</Typography>
            <Typography variant="p">{props.product.product_detail}</Typography>
            <Box>
              <p>재고 : {props.product.stock}</p>
              <Select size={"small"} onChange={handleChange} value={counts}>
                {stock}
              </Select>
            </Box>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => directOrder(props.product.product_seq, counts)}
          >
            바로 구매
          </Button>
          <Button
            variant="primary"
            onClick={() => addCart(props.product.product_seq, counts)}
          >
            장바구니 담기
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          상품이 장바구니에 담겼습니다
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            선택한 상품이 장바구니에 담겼습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <OrderDirectModal
        productInfo={props.product}
        counts={counts}
        show={showOrder}
        handleShow={handleShowOrder}
        handleClose={handleCloseOrder}
      />
    </>
  );
}
