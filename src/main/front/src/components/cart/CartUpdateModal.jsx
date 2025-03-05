import Modal from "react-bootstrap/Modal";
import { Button, Input, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { plus, minus, reset } from "../../store/product/productSlice";
import { appUrl } from "../../api/appUrl";

export default function CartUpdateModal(props) {
  //redux
  let counts = useSelector((state) => state.product);
  let dispatch = useDispatch();

  const [mDisable, setMDisable] = useState(false);
  const [pDisable, setPDisable] = useState(false);

  useEffect(() => {
    dispatch(reset());
  }, [props.handleClose]);

  useEffect(() => {
    if (counts + props.cart.productCounts == 1) {
      setMDisable(true);
    } else if (counts + props.cart.productCounts >= props.cart.stock) {
      setPDisable(true);
    } else {
      setMDisable(false);
      setPDisable(false);
    }
  }, [counts, props]);

  const updateCounts = (seq, count) => {
    appUrl
      .post("/cartCountUpdate", null, {
        params: { cartSeq: seq, count: count },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal size={"sm"} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.cart.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={props.awsurl + props.cart.img}
            className={"productListImg"}
          />
          <Typography variant={"p"}>{props.cart.productName}</Typography>
          <Stack direction={"row"} spacing={1}>
            <Button
              variant={"outlined"}
              className={"cntBtn"}
              onClick={() => dispatch(minus())}
              disabled={mDisable}
            >
              -
            </Button>

            <Typography>{counts + props.cart.productCounts}</Typography>
            <Button
              variant={"outlined"}
              className={"cntBtn"}
              onClick={() => dispatch(plus())}
              disabled={pDisable}
            >
              +
            </Button>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Typography variant={"p"}>
              총 가격 : {(counts + props.cart.productCounts) * props.cart.price}{" "}
              원
            </Typography>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() =>
              updateCounts(
                props.cart.cartSeq,
                counts + props.cart.productCounts,
              )
            }
          >
            수정
          </Button>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
