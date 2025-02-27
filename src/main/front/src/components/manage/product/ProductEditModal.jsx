import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, ListItemIcon, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { appUrl } from "../../../api/appUrl";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import { Delete } from "@mui/icons-material";

export default function ProductEditModal(props) {
  const [imgUrl, setImgUrl] = useState(
    "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/product/" +
      `${props.productInfo.img}`,
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const [form, setForm] = useState({
    product_seq: 0,
    product_name: "",
    price: 0,
    img: "",
    product_detail: "",
    stock: 0,
    product_status: 0,
  });

  useEffect(() => {
    setForm({
      ...form,
      product_seq: props.productInfo.product_seq,
      product_name: props.productInfo.product_name,
      price: props.productInfo.price,
      img: props.productInfo.img,
      product_detail: props.productInfo.product_detail,
      stock: props.productInfo.stock,
      product_status: props.productInfo.product_status,
    });
  }, [props.productInfo]);

  useEffect(() => {
    setImgUrl(
      `https://s3.ap-northeast-2.amazonaws.com/zstorage.store/product/${props.productInfo.img}`,
    );
  }, [props.productInfo]);

  const [category, setCategory] = useState([
    { categorySeq: 0, category_title: "" },
  ]);

  const getCategory = async () => {
    const categoryList = await appUrl
      .get("/categoryList")
      .then((result) => {
        setCategory(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getPresigendURL = async (e) => {
    const name = encodeURIComponent(e.target.files[0].name);
    const result = await appUrl("/presignedUrl?filename=" + name);
    const url1 = result.data;

    let confirm = await fetch(url1, {
      method: "PUT",
      body: e.target.files[0],
    });

    //console.log(confirm.url);

    if (confirm.ok) {
      setImgUrl(confirm.url.split("?")[0]);
    }
  };

  function handleDelete(seq) {
    appUrl
      .post("/productDelete", null, {
        params: {
          product_seq: seq,
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("삭제 완료");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = () => {
    console.log(form);
    if (
      !form.product_name ||
      !form.img ||
      !form.price ||
      !form.product_detail ||
      !form.stock
    ) {
      setShow(true);
      return;
    } else {
      setShow(false);
      //axios
      appUrl
        .post("/productEdit", null, {
          params: {
            product_seq: form.product_seq,
            product_name: form.product_name,
            price: form.price,
            img: form.img,
            product_detail: form.product_detail,
            stock: form.stock,
            product_status: form.product_status,
          },
        })
        .then((res) => {
          if (res.data === "ok") {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
      props.handleClose();
    }
  };

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <form>
        <Modal.Header closeButton>
          <Modal.Title>
            상품 수정 No.{props.productInfo.product_seq}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>상품 이름 변경</Form.Label>
            <Form.Control
              type="text"
              placeholder="상품 이름"
              defaultValue={props.productInfo.product_name}
              onChange={(e) =>
                setForm({ ...form, product_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>상품 가격 변경</Form.Label>
            <Form.Control
              type="text"
              placeholder="상품 가격"
              defaultValue={props.productInfo.price}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, price: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productImg">
            <Form.Label>상품 이미지 변경</Form.Label>
            <Form.Control
              type="file"
              placeholder="상품 이미지"
              onChange={(e) => {
                getPresigendURL(e);
                setForm({ ...form, img: e.target.files[0].name });
              }}
            />
            <img className={"productListImg"} src={imgUrl}></img>
          </Form.Group>
          <Form.Group className="mb-3" controlId="productDetail">
            <Form.Label>상품 설명 변경</Form.Label>
            <Form.Control
              type="text"
              placeholder="상품 설명"
              defaultValue={props.productInfo.product_detail}
              onChange={(e) =>
                setForm({ ...form, product_detail: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStock">
            <Form.Label>상품 재고 수량 변경</Form.Label>
            <Form.Control
              type="text"
              placeholder="상품 재고 수량"
              maxLength={2}
              defaultValue={props.productInfo.stock}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, stock: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStatus">
            <Form.Label>상품 진열 상태 변경</Form.Label>
            <Switch
              defaultChecked={
                props.productInfo.product_status === 1 ? true : false
              }
              onChange={(e) => {
                let checkNum = 0;
                if (e.target.checked === true) {
                  checkNum = 1;
                }
                if (e.target.checked === false) {
                  checkNum = 0;
                }
                setForm({ ...form, product_status: checkNum });
              }}
            />
          </Form.Group>
          {show === true ? (
            <Alert severity="error">빈칸을 확인하세요!!</Alert>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="error"
            onClick={() => handleDelete(props.productInfo.product_seq)}
          >
            <ListItemIcon>
              <Delete fontSize={"small"} /> DELETE
            </ListItemIcon>
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            CHANGE
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
