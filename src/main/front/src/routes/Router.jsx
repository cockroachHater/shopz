import { Routes, Route, Outlet } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import Event from "../components/event/Event";
import Faq from "../components/faq/Faq";
import Layout from "../layouts/Layout";
import Manage from "../components/manage/Manage";
import JoinForm from "../components/login/JoinForm";
import MyPage from "../components/login/MyPage";
import Cart from "../components/cart/Cart";
import Buy from "../components/buy/Buy";
import ProductList from "../components/product/ProductList";
import ProductManage from "../components/manage/product/ProductManage";
import EventManage from "../components/manage/event/EventManage";
import FaqManage from "../components/manage/faq/FaqManage";
import PurchaseManage from "../components/manage/purchase/PurchaseManage";
import UserManage from "../components/manage/user/UserManage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="join" element={<JoinForm />} />

        {/** loginUser **/}
        <Route path="mypage" element={<MyPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="buy" element={<Buy />} />

        {/** notice **/}
        <Route path="event" element={<Event />} />
        <Route path="faq" element={<Faq />} />

        {/** product **/}
        <Route path="category" element={<Outlet />}>
          <Route path="candy" element={<ProductList />} />
          <Route path="jelly" element={<div>jelly</div>} />
          <Route path="chocolate" element={<div>chocolate</div>} />
          <Route path="caramel" element={<div>caramel</div>} />
          <Route path="marshmallow" element={<div>marshmallow</div>} />
          <Route path="best" element={<div>BestSeller~~~</div>} />
        </Route>

        {/** admin**/}
        {/*<Route path="manage" element={<Manage />} />*/}
        <Route path="manage" element={<Manage />}>
          <Route path="product" element={<ProductManage />} />
          <Route path="event" element={<EventManage />} />
          <Route path="faq" element={<FaqManage />} />
          <Route path="purchase" element={<PurchaseManage />} />
          <Route path="user" element={<UserManage />} />
        </Route>
      </Route>
      <Route path="*" element={<div>404!</div>} />
    </Routes>
  );
}
