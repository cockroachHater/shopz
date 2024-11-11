import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import Home from "../Home";
import "../App.css";
import ProductLayout from "./ProductLayout";
import EventLayout from "./EventLayout";
import FaqLayout from "./FaqLayout";

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header></Header>
      <div className="mainLayout">
        {pathname === "/" ? (
          <Home />
        ) : (
          <>
            {pathname === "/event" ? (
              <EventLayout />
            ) : (
              <>{pathname === "/faq" ? <FaqLayout /> : <ProductLayout />}</>
            )}
          </>
        )}
      </div>
      <Footer></Footer>
    </Box>
  );
}
