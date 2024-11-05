import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="bbaga" element={<div>바보페이지임</div>} />
      </Route>
      <Route path="*" element={<div>404!</div>} />
    </Routes>
  );
}

export default App;
