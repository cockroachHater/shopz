import Container from "react-bootstrap/Container";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import EventAddModal from "./EventAddModal";
import { appUrl } from "../../../api/appUrl";
import EventEditModal from "./EventEditModal";

export default function EventManage() {
  const [event, setEvent] = useState([
    {
      event_seq: 0,
      event_title: "",
      event_contents: "",
      event_img: "",
      event_date: "",
    },
  ]);
  const [eventDetail, setEventDetail] = useState([
    {
      event_seq: 0,
      event_title: "",
      event_contents: "",
      event_img: "",
      event_date: "",
    },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
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
  //Modal Detail(Edit)
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  useEffect(() => {
    appUrl
      .get("/eventList")
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));
  }, [setEvent]);

  const getEventInfo = async (event_seq) => {
    const result = await appUrl
      .post("/eventDetail", null, {
        params: {
          event_seq: event_seq,
        },
      })
      .then((res) => {
        setEventDetail(res.data);
      })
      .catch((err) => console.log(err));
    handleShowDetail();
  };

  function handleDelete(seq) {
    appUrl
      .post("/eventDelete", null, {
        params: { event_seq: seq },
      })
      .then((res) => {
        alert("삭제 완료");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  const rows = event;
  return (
    <Container className="manageComponentTable">
      <div className="title_text">이벤트 관리</div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Num</TableCell>
                <TableCell>이벤트 제목</TableCell>
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow tabIndex={-1} key={i}>
                      <TableCell>{row.event_seq}</TableCell>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        onClick={() => getEventInfo(row.event_seq)}
                      >
                        {row.event_title}{" "}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={"outlined"}
                          onClick={() => handleDelete(row.event_seq)}
                          size={"small"}
                        >
                          삭제
                        </Button>{" "}
                      </TableCell>
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
      <Button sx={{ margin: "30px" }} variant="contained" onClick={handleShow}>
        이벤트 작성
      </Button>

      {/* Event Add Modal */}
      <EventAddModal
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
      />

      {/*  Event Edit Modal */}
      <EventEditModal
        handleShow={handleShowDetail}
        handleClose={handleCloseDetail}
        show={showDetail}
        eventInfo={eventDetail}
      />
    </Container>
  );
}
