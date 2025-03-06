import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { appUrl } from "../../api/appUrl";

export default function FaqAddModal(props) {
  const [form, setForm] = useState({
    faq_seq: 0,
    user_seq: 0,
    faq_title: "",
    faq_contents: "",
  });
  //react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setForm({
      ...form,
      faq_seq: data.faq_seq,
      user_seq: localStorage.getItem("seq"),
      faq_title: data.faq_title,
      faq_contents: data.faq_contents,
    });
    addFaq();
    props.handleClose();
  };

  //axios
  const addFaq = async () => {
    await appUrl
      .post("/addFaq", null, {
        params: {
          user_seq: localStorage.getItem("seq"),
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
  };

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Faq 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="faqTitle">
            <Form.Label>FAQ 제목 등록</Form.Label>
            <Form.Control
              type="text"
              placeholder="이벤트 제목"
              {...register("faq_title", {
                required: true,
              })}
              onChange={(e) => setForm({ ...form, faq_title: e.target.value })}
            />
            {errors.faq_title && errors.faq_title.type === "required" && (
              <Alert severity="error" className={"mt-3"}>
                제목을 입력하세요
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="faqContents">
            <Form.Label>FAQ 내용 등록</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="이벤트 내용"
              {...register("faq_contents", {
                required: true,
              })}
              onChange={(e) =>
                setForm({ ...form, faq_contents: e.target.value })
              }
            />
            {errors.faq_contents && errors.faq_contents.type === "required" && (
              <Alert severity="error" className={"mt-3"}>
                내용을 입력하세요
              </Alert>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            닫기
          </Button>
          <Button variant="primary" type={"submit"}>
            저장
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
