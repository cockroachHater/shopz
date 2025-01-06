import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useIdCheck from "../../hooks/login/useIdCheck";
import { useForm } from "react-hook-form";
import { appUrl } from "../../api/appUrl";
import { useNavigate } from "react-router-dom";

export default function JoinForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
    phone: "",
  });

  //id 유효성검사 커스텀 훅
  const [emailCheck, message, validation, checkBtn, readOnly, checkId] =
    useIdCheck(form);

  //엔터키로 이메일유효성검사
  const enterEvent = (e) => {
    if (e.key === "Enter") {
      checkId();
    }
  };
  //react-hook-form
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    setForm({
      ...form,
      password: data.password,
      passwordCheck: data.passwordCheck,
      name: data.name,
      phone: data.phone,
    });
    //axios
    if (
      typeof form.password === "undefined" ||
      form.password === "" ||
      form.password === null
    ) {
      console.log("No axios");
    } else {
      appUrl
        .post("/join", null, {
          params: {
            email: form.email,
            password: form.password,
            name: form.name,
            phone: form.phone,
          },
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("회원가입을 축하합니다!");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <div className="title_text">Join</div>
      <form className={"formControl"} onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel label="Email" className="mb-3 mt-3">
          <Form.Control
            type="text"
            autoFocus={true}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            readOnly={readOnly}
            defaultValue={form.email}
            placeholder={"이메일주소 입력"}
            onKeyDown={(e) => enterEvent(e)}
          />
        </FloatingLabel>

        {emailCheck === true ? (
          <Alert severity="error" className={"mt-3"}>
            {message}
          </Alert>
        ) : (
          <></>
        )}

        {checkBtn === true ? (
          <Button
            className={"mt-2"}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => checkId()}
          >
            Check Email
          </Button>
        ) : (
          <></>
        )}

        {validation === true ? (
          <>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                className="mb-3 mt-3"
                name={"password"}
                placeholder={"Password"}
                autoFocus={true}
                defaultValue={form.password}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 15,
                })}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && errors.password.type === "required" && (
                <Alert severity="error" className={"mt-3"}>
                  패스워드를 입력해주세요.
                </Alert>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <Alert severity="error" className={"mt-3"}>
                  패스워드는 최소 6자 이상 입력해주세요.
                </Alert>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <Alert severity="error" className={"mt-3"}>
                  패스워드는 최대 15자까지 입력 가능합니다!
                </Alert>
              )}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword2" label="Password Check">
              <Form.Control
                type="password"
                className="mb-3 mt-3"
                placeholder="Password Check"
                defaultValue={form.passwordCheck}
                {...register("passwordCheck", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                onChange={(e) =>
                  setForm({ ...form, passwordCheck: e.target.value })
                }
              />
              {errors.passwordCheck && (
                <Alert severity="error" className={"mt-3 mb-3"}>
                  패스워드 불일치!
                </Alert>
              )}
            </FloatingLabel>
            <FloatingLabel controlId="floatingName" label="Name">
              <Form.Control
                type="text"
                placeholder={"Name"}
                defaultValue={form.name}
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 15,
                })}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && errors.name.type === "required" && (
                <Alert severity="error" className={"mt-3 mb-3"}>
                  이름을 입력해주세요!
                </Alert>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <Alert severity="error" className={"mt-3 mb-3"}>
                  이름은 최소 3자 이상 입력해주세요.
                </Alert>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <Alert severity="error" className={"mt-3 mb-3"}>
                  이름은 최대 15자까지 입력 가능합니다!
                </Alert>
              )}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number">
              <Form.Control
                type="text"
                placeholder="Phone Number"
                className="mb-3 mt-3"
                defaultValue={form.phone}
                maxLength={11}
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9]*$/,
                  minLength: 11,
                })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, phone: e.target.value });
                }}
              />
              {errors.phone && errors.phone.type === "required" && (
                <Alert severity="error" className={"mt-3 mb-3"}>
                  핸드폰 번호를 입력해주세요!
                </Alert>
              )}
              {errors.phone && errors.phone.type === "minLength" && (
                <Alert severity="error" className={"mt-3 mb-3"}>
                  유효하지 않은 번호입니다!
                </Alert>
              )}
              {errors.phone && errors.phone.type === "pattern" && (
                <Alert severity="error" className={"mt-3 mb-3"}>
                  유효하지 않은 번호입니다!
                </Alert>
              )}
            </FloatingLabel>
            <Button
              className={"mt-3"}
              variant={"contained"}
              endIcon={<SendIcon />}
              type={"submit"}
            >
              Join
            </Button>
          </>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
