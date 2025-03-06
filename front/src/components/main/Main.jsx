import { Helmet } from "react-helmet-async";
import logoR from "../../img/logoR.png";

export default function Main() {
  return (
    <>
      <Helmet>
        <title>정유진 포트폴리오</title>
      </Helmet>
      <div className="App">
        <div>
          <img src={logoR} className="App-logo" alt="logo" />
          <p className={"just_text"}>
            안녕하세요 지원자_[정유진] 포트폴리오 입니다
          </p>
          <p>Back-End : Java, SpringBoot </p>
          <p>Front-End : React </p>
          <p className={"just_text"}>
            자세한 기능 구현 설명 및 소스코드 확인은{" "}
            <a
              href={
                "https://obsidian-tree-5f9.notion.site/Shoppingmall-Project-150303b7caad810883baf6cc7fe11254"
              }
              target="_blank"
            >
              *여기*
            </a>{" "}
            에서 가능합니다
          </p>
          <p className={"just_text"}>감사합니다 :-) </p>
        </div>
      </div>
    </>
  );
}
