import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, ListItemIcon } from "@mui/material";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { appUrl } from "../../../api/appUrl";

export default function EventEditModal(props) {
  const [imgUrl, setImgUrl] = useState(
    "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/event/" +
      `${props.eventInfo.event_img}`,
  );
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    event_seq: 0,
    event_title: "",
    event_contents: "",
    event_img: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      event_seq: props.eventInfo.event_seq,
      event_title: props.eventInfo.event_title,
      event_contents: props.eventInfo.event_title,
      event_img: props.eventInfo.event_img,
    });
  }, [props.eventInfo]);

  useEffect(() => {
    setImgUrl(
      `https://s3.ap-northeast-2.amazonaws.com/zstorage.store/event/${props.eventInfo.event_img}`,
    );
  }, [props.eventInfo]);

  const getPresignedURL = async (e) => {
    const name = encodeURIComponent(e.target.files[0].name);
    const result = await appUrl("/e_presignedUrl?filename=" + name);
    const url1 = result.data;
    let confirm = await fetch(url1, {
      method: "PUT",
      body: e.target.files[0],
    });
    if (confirm.ok) {
      setImgUrl(confirm.url.split("?")[0]);
    }
  };

  const handleSubmit = () => {
    if (!form.event_title || !form.event_contents || !form.event_img) {
      setShow(true);
      return;
    } else {
      setShow(false);
      //axios
      appUrl
        .post("/eventEdit", null, {
          params: {
            event_seq: form.event_seq,
            event_title: form.event_title,
            event_contents: form.event_title,
            event_img: form.event_img,
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
          <Modal.Title>이벤트 No.{props.eventInfo.event_seq}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="eventTitle">
            <Form.Label>이벤트 제목 변경</Form.Label>
            <Form.Control
              type="text"
              placeholder="이벤트 제목"
              defaultValue={props.eventInfo.event_title}
              onChange={(e) =>
                setForm({ ...form, event_title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventContents">
            <Form.Label>이벤트 내용 등록</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="이벤트 내용"
              defaultValue={props.eventInfo.event_contents}
              onChange={(e) =>
                setForm({ ...form, event_contents: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eventImg">
            <Form.Label>이미지 등록</Form.Label>
            <Form.Control
              type="file"
              placeholder="이벤트 이미지"
              onChange={(e) => {
                getPresignedURL(e);
                setForm({ ...form, event_img: e.target.files[0].name });
              }}
            />
            <img className={"productListImg"} src={imgUrl}></img>
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
