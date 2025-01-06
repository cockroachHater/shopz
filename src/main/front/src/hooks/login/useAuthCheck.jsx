import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthCheck() {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const [userName, setUserName] = useState(name);

  useEffect(() => {
    setUserName(name);
  }, [name]);

  function authCheck() {
    if (userName === null) {
      navigate("/");
    }
  }

  return [userName, authCheck];
}
