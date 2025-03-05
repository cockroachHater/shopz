import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { appUrl } from "../../api/appUrl";

export default function FaqEditModal(props) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    faq_seq: 0,
    faq_title: "",
    faq_contents: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      faq_seq: props.faqInfo.faq_seq,
      faq_title: props.faqInfo.faq_title,
      faq_contents: props.faqInfo.faq_title,
    });
  }, [props.faqInfo]);

  const handleSubmit = () => {
    if (!form.faq_title || !form.faq_contents) {
      setShow(true);
      return;
    } else {
      setShow(false);
      //axios
      appUrl
        .post("/faqEdit", null, {
          params: {
            faq_seq: form.faq_seq,
            faq_title: form.faq_title,
            faq_contents: form.faq_contents,
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
          <Modal.Title>Faq 상세보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="eventTitle">
            <Form.Label>FAQ 제목 변경</Form.Label>
            <Form.Control
              type="text"
              placeholder="FAQ 제목"
              defaultValue={props.faqInfo.faq_title}
              onChange={(e) => setForm({ ...form, faq_title: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventContents">
            <Form.Label>FAQ 내용 등록</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="FAQ 내용"
              defaultValue={props.faqInfo.faq_contents}
              onChange={(e) =>
                setForm({ ...form, faq_contents: e.target.value })
              }
            />
          </Form.Group>
          {show === true ? (
            <Alert severity="error">빈칸을 확인하세요!!</Alert>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            CHANGE
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
