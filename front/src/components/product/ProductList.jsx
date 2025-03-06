import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import useCategoryPath from "../../hooks/product/useCategoryPath";
import { appUrl } from "../../api/appUrl";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ProductDetailModal from "./ProductDetailModal";

export default function ProductList() {
  const awsurl =
    "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/product/";
  const [category] = useCategoryPath();
  const [num, setNum] = useState(-1);
  const [productInfo, setProductInfo] = useState([
    {
      product_seq: 0,
      category_seq: 0,
      product_name: "",
      price: 0,
      img: "",
      product_detail: "",
      stock: 0,
      product_status: 0,
      category_title: "",
    },
  ]);
  const [productDetail, setProductDetail] = useState([
    {
      product_seq: 0,
      category_seq: 0,
      product_name: "",
      price: 0,
      img: "",
      product_detail: "",
      stock: 0,
      product_status: 0,
      category_title: "",
    },
  ]);

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getProductInfo = async (productSeq) => {
    const result = await appUrl
      .post("/productDetail", null, { params: { product_seq: productSeq } })
      .then((res) => {
        //console.log(res.data[0]);
        setProductDetail(res.data[0]);
      })
      .catch((err) => console.log(err));
    handleShow();
  };

  useEffect(() => {
    switch (category) {
      case "candy":
        setNum(0);
        break;
      case "jelly":
        setNum(1);
        break;
      case "chocolate":
        setNum(2);
        break;
      case "caramel":
        setNum(3);
        break;
      case "marshmallow":
        setNum(4);
        break;
      case "best":
        setNum(5);
    }
  }, [category]);

  useEffect(() => {
    appUrl
      .post("/productCategory", null, {
        params: { category_seq: num },
      })
      .then((res) => {
        //console.log(res.data);
        setProductInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [num]);

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          placeItems: "center",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: 2,
        }}
      >
        {productInfo &&
          productInfo.map((productInfo) => (
            <Card sx={{ maxWidth: 200 }} key={productInfo.product_seq}>
              <CardActionArea
                disabled={productInfo.stock === 0 ? true : false}
                onClick={() => getProductInfo(productInfo.product_seq)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={awsurl + productInfo.img}
                  alt={productInfo.img}
                />
                {productInfo.stock === 0 ? (
                  <CardContent>
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {productInfo.product_name} (품절)
                    </Typography>
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {productInfo.price}원
                    </Typography>
                  </CardContent>
                ) : (
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {productInfo.product_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {productInfo.price}원
                    </Typography>
                  </CardContent>
                )}
              </CardActionArea>
            </Card>
          ))}
      </Box>

      <ProductDetailModal
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
        product={productDetail}
      />
    </Container>
  );
}
