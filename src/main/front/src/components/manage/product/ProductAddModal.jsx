import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
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
  });

  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    formReset();
  }, [setForm]);
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
    console.log("-----hook form-start-----");
    setForm({
      ...form,
      category_seq: data.category_seq,
      product_name: data.product_name,
      price: data.price,
      img: form.img[0].name,
      product_detail: data.product_detail,
      stock: data.stock,
    });
    console.log(form.img[0].name);
    console.log(form);

    //다 됐으면 presignURL받고, s3 저장
    getPresignUrl();
  };

  const getPresignUrl = async () => {
    const name = encodeURIComponent(form.img[0].name);
    console.log(form.img);
    console.log(form.img[0].name);
    const result = await appUrl("/presignedUrl?filename=" + name);
    const url = result.data;
    console.log(url);

    let confirm = await fetch(url, {
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
        },
      })
      .then((res) => {
        if (res.data === "ok") {
          formReset();
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

  const formReset = () => {
    setForm({
      category_seq: 0,
      product_name: "",
      price: 0,
      img: "",
      product_detail: "",
      stock: 0,
    });
  };
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>상품 카테고리 선택</Form.Label>
            <Form.Select
              type="text"
              placeholder="상품 이름"
              autoFocus
              {...register("category_seq", {
                required: true,
              })}
            >
              {category.map((category) => (
                <option
                  key={category.category_seq}
                  value={category.category_seq}
                >
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
              maxLength={9}
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
