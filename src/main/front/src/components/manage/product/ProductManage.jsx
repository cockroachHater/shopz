import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Container from "react-bootstrap/Container";
import { Button } from "@mui/material";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import ProductAddModal from "./ProductAddModal";

export default function ProductManage() {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First name" },
    { field: "lastName", headerName: "Last name" },
    {
      field: "age",
      headerName: "Age",
      type: "number",
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 12 },
    { id: 6, lastName: "Melisandre", firstName: "kk", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const paginationModel = { page: 0, pageSize: 10 };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container className="manageComponentTable">
        <div className="title_text">Manager</div>
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
        <Button
          sx={{ margin: "30px" }}
          variant="contained"
          onClick={handleShow}
        >
          상품 추가
        </Button>
        <ProductAddModal
          handleShow={handleShow}
          handleClose={handleClose}
          show={show}
        />
      </Container>
    </>
  );
}
