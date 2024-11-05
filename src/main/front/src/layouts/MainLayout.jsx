import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../Home";

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header></Header>
      {pathname === "/" ? <Home /> : <></>}
      <Outlet />
      <Footer></Footer>
    </Box>
  );
}
