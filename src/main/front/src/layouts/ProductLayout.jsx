import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import test1 from "../img/test/c10.jpg";
import test2 from "../img/test/c11.jpg";
import test3 from "../img/test/c12.jpg";
import styled from "styled-components";
export default function ProductLayout() {
  return (
    <>
      <Container>
        <div>ProductLayout...api로 데이터 받아서 챠라락 넣을거임</div>
        <ProductRow>
          <Product src={test1} />
          <Product src={test2} />
          <Product src={test3} />
        </ProductRow>
      </Container>
      <Outlet />
    </>
  );
}
let ProductRow = styled.div`
  display: flex;
  justify-content: center;
`;
let Product = styled.img`
  max-width: 200px;
  min-width: 100px;
  max-height: 200px;
  min-height: 100px;
  border-radius: 7px;
  margin: 10px;
`;
