import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { appUrl } from "../../api/appUrl";
import Alert from "@mui/material/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function JoinForm() {
  const [show, setShow] = useState(false);

  const join = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log(username);
    console.log(password);

    appUrl
      .post("/join", null, {
        params: { username: username, password: password },
      })
      .then((res) => {
        if (res.data !== "ok") {
          setShow(true);
        } else {
          setShow(false);
          alert("success!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Helmet>Join Page</Helmet>
      <div className="title_text">Join</div>
      <form onSubmit={join}>
        <FloatingLabel
          controlId="floatingInput"
          label="ID"
          className="mb-3 mt-3"
        >
          <Form.Control type="text" placeholder="id" name={"username"} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            name={"password"}
          />
        </FloatingLabel>
        {show == true ? (
          <Alert severity="error" className={"mt-3"}>
            Check your id or password!
          </Alert>
        ) : (
          <></>
        )}
        <Button
          className={"mt-3"}
          variant="contained"
          type={"submit"}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </form>
    </>
  );
}
