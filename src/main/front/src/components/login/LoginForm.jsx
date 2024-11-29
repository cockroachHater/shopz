import { Helmet } from "react-helmet-async";
import { appUrl } from "../../api/appUrl";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const login = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log(username);
    console.log(password);

    appUrl
      .post("/login", null, {
        params: { username: username, password: password },
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data !== "failed") {
          //setShow(true);
          console.log(res.data);
          localStorage.setItem("jwt_token", res.data);
          navigate("/mypage");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="title_text">Login</div>
      <form onSubmit={login}>
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
        {show === true ? (
          <Alert severity="error" className={"mt-3"}>
            Check your id or password!
          </Alert>
        ) : (
          <></>
        )}
        <Button
          className={"m-3"}
          onClick={() => {
            navigate("/join");
          }}
          variant={"outlined"}
        >
          Join
        </Button>
        <Button
          className={"m-3"}
          variant="contained"
          type={"submit"}
          endIcon={<SendIcon />}
        >
          Login
        </Button>
      </form>
    </>
  );
}
