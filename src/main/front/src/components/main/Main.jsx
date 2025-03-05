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
        </div>
      </div>
    </>
  );
}
