import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import useAuthCheck from "../../hooks/login/useAuthCheck";

export default function MyPage() {
  const [userName, authCheck] = useAuthCheck();
  useEffect(() => {
    authCheck();
  }, []);

  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>

      <div className="title_text">Mypage Welcome {userName}</div>
    </>
  );
}
