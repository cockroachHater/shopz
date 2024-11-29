import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { appUrl } from "../../api/appUrl";

export default function MyPage() {
  useEffect(() => {
    getJwt();
  }, []);

  const getJwt = async () => {
    const token = localStorage.getItem("jwt_token");
    const jwt = await appUrl
      .get("/mypage", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("axios ok");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    // const Jwt = await appUrl
    //   .get("/mypage", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((result) => {
    //     console.log("------getJwt-----");
    //     console.log(result.data);
    //   })
    //   .catch((err) => console.log(err));
    console.log(token);
  };

  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <div className="title_text">Mypage</div>
    </>
  );
}
