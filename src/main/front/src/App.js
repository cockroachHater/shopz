import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<div>로그인&회원가입 페이지임</div>} />
      <Route path="bbaga" element={<div>바보페이지임</div>} />
      <Route path="*" element={<div>404!</div>} />
    </Routes>
  );
}

export default App;
