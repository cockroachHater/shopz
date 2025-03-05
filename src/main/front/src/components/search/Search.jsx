import Container from "react-bootstrap/Container";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import { appUrl } from "../../api/appUrl";
import ProductDetailModal from "../product/ProductDetailModal";

export default function Search() {
  const awsurl =
    "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/product/";
  const [searchText, setSearchText] = useState("");
  const [productInfo, setProductInfo] = useState([]);
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

  const handleSearch = (searchText) => {
    appUrl
      .post("/ProductSearchList", null, {
        params: { searchText: searchText },
      })
      .then((res) => {
        setProductInfo(res.data);
      })
      .catch((err) => console.log(err));
  };
  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getProductInfo = async (productSeq) => {
    const result = await appUrl
      .post("/productDetail", null, { params: { product_seq: productSeq } })
      .then((res) => {
        setProductDetail(res.data[0]);
      })
      .catch((err) => console.log(err));
    handleShow();
  };

  //엔터키로 검색
  const enterEvent = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  return (
    <Container>
      <FloatingLabel
        controlId="floatingInput"
        label="search"
        className="mb-3 mt-3"
      >
        <Form.Control
          type="text"
          placeholder="search"
          name={"search"}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => enterEvent(e)}
        />
      </FloatingLabel>
      <Button
        className={"m-3"}
        onClick={() => handleSearch(searchText)}
        variant={"contained"}
      >
        검색
      </Button>

      <div className="title_text">Search List</div>
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
