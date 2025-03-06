import Container from "react-bootstrap/Container";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { appUrl } from "../../api/appUrl";
import EventModal from "./EventModal";

export default function Event() {
  //Modal
  const [show, setShow] = useState(false);
  //ModalControl
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    handleShow();
  };
  return (
    <>
      <Container>
        <div className="title_text">EVENT</div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell align={"right"}>작성일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {event &&
                  event.map((event, i) => (
                    <TableRow
                      key={i}
                      style={{ cursor: "pointer" }}
                      hover
                      onClick={() => getEventInfo(event.event_seq)}
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{event.event_title}</TableCell>
                      <TableCell align={"right"}>{event.event_date}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* EventModal */}
      <EventModal
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
        event={eventDetail}
      />
    </>
  );
}
