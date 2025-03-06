import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/navbar/Header";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";
import Main from "../components/main/Main";
import { useEffect } from "react";
import useAuthCheck from "../hooks/login/useAuthCheck";
import useRoleCheck from "../hooks/role/useRoleCheck";

export default function Layout() {
  const { pathname } = useLocation();
  const [userName] = useAuthCheck();
  const [userRole] = useRoleCheck();
  useEffect(() => {
    console.log(pathname);
  }, []);

  return (
    <>
      <Header userName={userName} userRole={userRole} />
      <div className="mainLayout">
        {pathname === "/" ? <Main /> : <Outlet />}
      </div>
      <Footer />
    </>
  );
}
