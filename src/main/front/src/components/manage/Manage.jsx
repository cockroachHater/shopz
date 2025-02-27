import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/Container";
import useRoleCheck from "../../hooks/role/useRoleCheck";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ManageSideMenu from "./menu/ManageSideMenu";
import { useLocation } from "react-router-dom";
import ProductManage from "./product/ProductManage";
import { Box } from "@mui/material";

export default function Manage() {
  const [userRole, roleCheck] = useRoleCheck();
  const { pathname } = useLocation();
  useEffect(() => {
    roleCheck();
  }, []);
  return (
    <>
      <Helmet>
        <title>AdminPage!</title>
      </Helmet>

      <Container>
        <Box className="manageLayout">
          <div className="manageSideMenu">
            <ManageSideMenu />
          </div>
          <div className="manageComponent">
            {pathname === "/manage" ? <ProductManage /> : <Outlet />}
          </div>
        </Box>
      </Container>
    </>
  );
}
