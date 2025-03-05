import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { appUrl } from "../../../api/appUrl";
import Form from "react-bootstrap/Form";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";

export default function EventAddModal(props) {
  const [form, setForm] = useState({
    event_seq: 0,
    user_seq: 0,
    user_name: "",
    event_title: "",
    event_contents: "",
    event_view_count: 0,
    event_updated: "",
    event_img: "",
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
      user_seq: localStorage.getItem("seq"),
      event_title: data.event_title,
      event_contents: data.event_contents,
      event_img: form.img[0].name,
    });
    getPresignUrl();
    props.handleClose();
  };

  const getPresignUrl = async () => {
    const name = encodeURIComponent(form.img[0].name);
    const result = await appUrl("/e_presignedUrl?filename=" + name);
    const url1 = result.data;

    let confirm = await fetch(url1, {
      method: "PUT",
      body: form.img[0],
    });

    //axios db insert
    await appUrl
      .post("/addEvent", null, {
        params: {
          user_seq: localStorage.getItem("seq"),
          event_title: form.event_title,
          event_contents: form.event_contents,
          event_img: form.img[0].name,
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
    <Modal size={"lg"} show={props.show} onHide={props.handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>이벤트 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="eventTitle">
            <Form.Label>이벤트 제목 등록</Form.Label>
            <Form.Control
              type="text"
              placeholder="이벤트 제목"
              {...register("event_title", {
                required: true,
              })}
              onChange={(e) =>
                setForm({ ...form, event_title: e.target.value })
              }
            />
            {errors.event_title && errors.event_title.type === "required" && (
              <Alert severity="error" className={"mt-3"}>
                제목을 입력하세요
              </Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventContents">
            <Form.Label>이벤트 내용 등록</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="이벤트 내용"
              {...register("event_contents", {
                required: true,
              })}
              onChange={(e) =>
                setForm({ ...form, event_contents: e.target.value })
              }
            />
            {errors.event_contents &&
              errors.event_contents.type === "required" && (
                <Alert severity="error" className={"mt-3"}>
                  내용을 입력하세요
                </Alert>
              )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventImg">
            <Form.Label>이미지 등록</Form.Label>
            <Form.Control
              type="file"
              placeholder="이벤트 이미지"
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
