import { Helmet } from "react-helmet-async";
import useAuthCheck from "../../hooks/login/useAuthCheck";
import { useEffect } from "react";

export default function Cart() {
  const [userName, authCheck] = useAuthCheck();
  useEffect(() => {
    authCheck();
  }, []);
  return (
    <>
      <Helmet>
        <title>장바구니</title>
      </Helmet>
      <div className="title_text">장바구니</div>
    </>
  );
}
