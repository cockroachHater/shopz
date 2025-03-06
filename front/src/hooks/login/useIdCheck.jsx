import { useState } from "react";
import { appUrl } from "../../api/appUrl";
import {
  existMessage,
  nullMessage,
  emailRegMessage,
} from "../../message/errormsg";

export default function useIdCheck(defaultValue) {
  const [emailCheck, setEmailCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [validation, setValidation] = useState(false);
  const [checkBtn, setCheckBtn] = useState(true);
  const [readOnly, setReadOnly] = useState(false);

  const checkId = () => {
    appUrl
      .post("/idCheck", null, { params: { email: defaultValue.email } })
      .then((res) => {
        const result = res.data;
        switch (result) {
          case "ok":
            setValidation(true);
            setCheckBtn(false);
            setReadOnly(true);
            setEmailCheck(false);
            break;
          case "nullError":
            setEmailCheck(true);
            setMessage(nullMessage);
            break;
          case "wrongEmail":
            setEmailCheck(true);
            setMessage(emailRegMessage);
            break;
          case "exists":
            setMessage(existMessage);
            setEmailCheck(true);
            setValidation(false);
            setCheckBtn(true);
            break;
        }
      })
      .catch((err) => console.log(err));
  };

  return [emailCheck, message, validation, checkBtn, readOnly, checkId];
}
