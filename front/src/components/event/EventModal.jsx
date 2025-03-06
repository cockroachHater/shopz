import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Typography } from "@mui/material";

export default function EventModal(props) {
  const imgUrl =
    "https://s3.ap-northeast-2.amazonaws.com/zstorage.store/event/";
  return (
    <Modal size={"lg"} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.event.event_title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3 modalDiv" controlId="productName">
          <img
            className={"eventDetailImg"}
            src={imgUrl + props.event.event_img}
          ></img>
          <pre>
            <Typography variant={"h6"}>{props.event.event_contents}</Typography>
          </pre>
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
}
