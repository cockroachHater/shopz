import { Outlet } from "react-router-dom";
import Header from "../components/navbar/Header";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";
import Main from "../components/main/Main";
import { useEffect } from "react";
import ProductList from "../components/product/ProductList";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(pathname);
  }, []);

  return (
    <>
      <Header />
      <div className="mainLayout">
        {pathname === "/" ? <Main /> : <Outlet />}
        {pathname === "/candy" ? <ProductList /> : <></>}
        {pathname === "/jelly" ? <ProductList /> : <></>}
        {pathname === "/chocolate" ? <ProductList /> : <></>}
        {pathname === "/caramel" ? <ProductList /> : <></>}
        {pathname === "/marshmallow" ? <ProductList /> : <></>}
        {pathname === "/best" ? <ProductList /> : <></>}
      </div>
      <Footer />
    </>
  );
}
