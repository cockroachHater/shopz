import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import Event from "../components/event/Event";
import Faq from "../components/faq/Faq";
import Layout from "../layouts/Layout";
import Manage from "../pages/manage/Manage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="event" element={<Event />} />
        <Route path="faq" element={<Faq />} />
        <Route path="manage" element={<Manage />} />
        {/** product **/}
        <Route path="candy" element={<div>candy</div>} />
        <Route path="jelly" element={<div>jelly</div>} />
        <Route path="chocolate" element={<div>chocolate</div>} />
        <Route path="caramel" element={<div>caramel</div>} />
        <Route path="marshmallow" element={<div>marshmallow</div>} />
        <Route path="best" element={<div>BestSeller~~~</div>} />
        {/** product **/}
      </Route>
      <Route path="*" element={<div>404!</div>} />
    </Routes>
  );
}
