import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { appUrl } from "../../../api/appUrl";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";

export default function ProductAddModal(props) {
  const [form, setForm] = useState({
    category_seq: 0,
    product_name: "",
    price: 0,
    img: "",
    product_detail: "",
    stock: 0,
    product_status: 0,
  });

  useEffect(() => {
    getCategory();
  }, []);

  const [category, setCategory] = useState([
    { category_seq: 0, category_title: "" },
  ]);

  //react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setForm({
      ...form,
      category_seq: data.category_seq,
      product_name: data.product_name,
      price: data.price,
      img: form.img[0].name,
      product_detail: data.product_detail,
      stock: data.stock,
      product_status: data.status,
    });

    //다 됐으면 presignURL받고, s3 저장
    getPresignUrl();
    props.handleClose();
  };

  const getPresignUrl = async () => {
    const name = encodeURIComponent(form.img[0].name);
    const result = await appUrl("/presignedUrl?filename=" + name);
    const url1 = result.data;

    let confirm = await fetch(url1, {
      method: "PUT",
      body: form.img[0],
    });

    //axios db insert
    await appUrl
      .post("/addProduct", null, {
        params: {
          category_seq: form.category_seq,
          product_name: form.product_name,
          price: form.price,
          img: form.img[0].name,
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
  };

  const getCategory = async () => {
    const categoryList = await appUrl
      .get("/categoryList")
      .then((result) => {
        setCategory(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>상품 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>상품 카테고리 선택</Form.Label>
            <Form.Select
              type="text"
              autoFocus
              {...register("category_seq", {
                required: true,
              })}
              onChange={(e) =>
                setForm({ ...form, category_seq: e.target.value })
              }
            >
              {category.map((category, i) => (
                <option key={i} value={category.categorySeq}>
                  {category.category_title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>상품 이름 등록</Form.Label>
            <Form.Control
              type="text"
              placeholder="상품 이름"
              {...register("product_name", {
                required: true,
              })}
              onChange={(e) =>
                setForm({ ...form, product_name: e.target.value })
              }
            />
            {errors.product_name && errors.product_name.type === "required" && (
              <Alert severity="error" className={"mt-3"}>
                상품명을 입력해주세요
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>상품 가격 등록</Form.Label>
            <Form.Control
              type="text"
              placeholder="상품 가격"
              maxLength={9}
              {...register("price", {
                required: true,
                pattern: /^[0-9]*$/,
              })}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, price: e.target.value });
              }}
            />
            {errors.price && errors.price.type === "required" && (
              <Alert severity="error" className={"mt-3 mb-3"}>
                상품 가격을 입력해주세요!
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="productImg">
            <Form.Label>상품 이미지 등록</Form.Label>
            <Form.Control
              type="file"
              placeholder="상품 이미지"
              {...register("img", {
                required: true,
              })}
              onChange={(e) => {
                setForm({ ...form, img: e.target.files });
              }}
            />
            {errors.img && errors.img.type === "required" && (
              <Alert severity="error" className={"mt-3 mb-3"}>
                이미지를 등록해주세요!
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="productDetail">
            <Form.Label>상품 설명 등록</Form.Label>
            <Form.Control
              type="text"
              placeholder="상품 설명"
              {...register("product_detail", {
                required: true,
              })}
              onChange={(e) =>
                setForm({ ...form, product_detail: e.target.value })
              }
            />
            {errors.product_detail &&
              errors.product_detail.type === "required" && (
                <Alert severity="error" className={"mt-3 mb-3"}>
                  상품 설명을 등록해주세요!
                </Alert>
              )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStock">
            <Form.Label>상품 재고 수량 등록</Form.Label>
            <Form.Control
              type="text"
              placeholder="상품 재고 수량"
              maxLength={2}
              {...register("stock", {
                required: true,
                pattern: /^[0-9]*$/,
              })}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, stock: e.target.value });
              }}
            />
            {errors.stock && errors.stock.type === "required" && (
              <Alert severity="error" className={"mt-3 mb-3"}>
                재고 수량을 등록해주세요!
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStatus">
            <Form.Label>상품 진열 상태 설정</Form.Label>
            <Switch
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" type={"submit"}>
            SAVE
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
