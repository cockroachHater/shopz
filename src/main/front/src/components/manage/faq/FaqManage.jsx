import Container from "react-bootstrap/Container";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import FaqAddModal from "../../faq/FaqAddModal";
import FaqEditModal from "../../faq/FaqEditModal";
import { appUrl } from "../../../api/appUrl";

export default function FaqManage() {
  //Modal control(Add)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //Modal control(Edit & Detail)
  const [editShow, setEditShow] = useState(false);
  const handleCloseEdit = () => setEditShow(false);
  const handleShowEdit = () => setEditShow(true);

  const [faq, setFaq] = useState([
    {
      faq_seq: 0,
      user_seq: 0,
      faq_title: "",
      faq_contents: "",
    },
  ]);
  const [faqDetail, setFaqDetail] = useState([
    {
      faq_seq: 0,
      user_seq: 0,
      faq_title: "",
      faq_contents: "",
    },
  ]);
  useEffect(() => {
    appUrl
      .get("/faqList")
      .then((res) => setFaq(res.data))
      .catch((err) => console.log(err));
  }, [setFaq]);

  const getFaq = async (seq) => {
    const result = await appUrl
      .post("/faqDetail", null, {
        params: {
          faq_seq: seq,
        },
      })
      .then((res) => {
        setFaqDetail(res.data);
      })
      .catch((err) => console.log(err));
    handleShowEdit();
  };

  function handleDelete(seq) {
    appUrl
      .post("/faqDelete", null, {
        params: { faq_seq: seq },
      })
      .then((res) => {
        alert("삭제 완료");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <div className={"title_text"}>FAQ 관리</div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader size={"small"}>
            <TableHead>
              <TableRow>
                <TableCell>Num</TableCell>
                <TableCell>FAQ 제목</TableCell>
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faq.map((faq, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => getFaq(faq.faq_seq)}
                  >
                    {faq.faq_title}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"outlined"}
                      size={"small"}
                      onClick={() => handleDelete(faq.faq_seq)}
                    >
                      삭제
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button sx={{ margin: "30px" }} variant="contained" onClick={handleShow}>
        FAQ 작성
      </Button>

      {/*  FAQ Add Modal  */}
      <FaqAddModal
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
      />

      {/*  FAQ Edit Modal */}
      <FaqEditModal
        handleShow={handleShowEdit}
        handleClose={handleCloseEdit}
        show={editShow}
        faqInfo={faqDetail}
      />
    </Container>
  );
}
