import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import MainLayout from "./layouts/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="candy" element={<div>candy</div>} />
        <Route path="jelly" element={<div>jelly</div>} />
        <Route path="chocolate" element={<div>chocolate</div>} />
        <Route path="caramel" element={<div>caramel</div>} />
        <Route path="marshmallow" element={<div>marshmallow</div>} />
        <Route path="best" element={<div>BestSeller~~~</div>} />
        <Route path="event" element={<div>EventPage~</div>} />
        <Route path="faq" element={<div>F A Q !</div>} />
      </Route>
      <Route path="*" element={<div>404!</div>} />
    </Routes>
  );
}

export default App;
