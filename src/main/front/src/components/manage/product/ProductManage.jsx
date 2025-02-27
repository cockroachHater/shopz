import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Container from "react-bootstrap/Container";
import {
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProductAddModal from "./ProductAddModal";
import { appUrl } from "../../../api/appUrl";
import ProductEditModal from "./ProductEditModal";

export default function ProductManage() {
  const [product, setProduct] = useState([
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
  const [productInfo, setProductInfo] = useState({
    product_seq: 0,
    category_seq: 0,
    product_name: "",
    price: 0,
    img: "",
    product_detail: "",
    stock: 0,
    product_status: 0,
    category_title: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  //pageNation
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Modal control(Add)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modal control(Edit)
  const handleClose2 = () => setShowEdit(false);
  const handleShow2 = () => setShowEdit(true);
  const getProductInfo = async (productSeq) => {
    const result = await appUrl
      .post("/productDetail", null, { params: { product_seq: productSeq } })
      .then((res) => {
        setProductInfo(res.data[0]);
      })
      .catch((err) => console.log(err));
    handleShow2();
  };

  //chart header
  const columns = [
    { id: "product_seq", label: "Product ID", minWidth: 40 },
    {
      id: "img",
      label: "Img",
      minWidth: 80,
      format: (value) =>
        "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/product/" +
        value,
    },
    { id: "product_name", label: "Name", minWidth: 80 },

    {
      id: "price",
      label: "Price\u00a0(₩)",
      minWidth: 80,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "stock",
      label: "Stock",
      minWidth: 80,
    },
    { id: "product_status", label: "Status", minWidth: 40 },
  ];

  const rows = product;

  useEffect(() => {
    //getProductList
    appUrl
      .get("/productList")
      .then((res) => {
        setProduct(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [setProduct]);

  return (
    <>
      <Container className="manageComponentTable">
        <div className="title_text">Manager</div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  {columns.map((column, x) => (
                    <TableCell key={x} style={{ minWidth: column.minWidth }}>
                      <b>{column.label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow
                        hover
                        style={{ cursor: "pointer" }}
                        role="checkbox"
                        tabIndex={-1}
                        key={i}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              onClick={() => getProductInfo(row.product_seq)}
                            >
                              {column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : column.id === "img" ? (
                                <img
                                  src={column.format(value)}
                                  className={"productListImg"}
                                ></img>
                              ) : column.id === "product_status" ? (
                                <Switch
                                  checked={
                                    row.product_status === 1 ? true : false
                                  }
                                  disabled={true}
                                />
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Button
          sx={{ margin: "30px" }}
          variant="contained"
          onClick={handleShow}
        >
          상품 추가
        </Button>

        {/* Product Add Model */}
        <ProductAddModal
          handleShow={handleShow}
          handleClose={handleClose}
          show={show}
        />
        {/* Product Edit Modal */}
        <ProductEditModal
          handleShow={handleShow2}
          handleClose={handleClose2}
          show={showEdit}
          productInfo={productInfo}
        />
      </Container>
    </>
  );
}
