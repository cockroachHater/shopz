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
    const email = e.target.email.value;
    const password = e.target.password.value;

    appUrl
      .post("/login", null, {
        params: { email: email, password: password },
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data !== null) {
          localStorage.setItem("seq", res.data.user_seq);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("role", res.data.user_role);
          navigate("/mypage");
        }
      })
      .catch((err) => {
        setShow(true);
      });
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
          label="email"
          className="mb-3 mt-3"
        >
          <Form.Control type="text" placeholder="email" name={"email"} />
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
            잘못된 정보입니다!
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
