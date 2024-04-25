import React from "react";
import { Container, Row } from "react-bootstrap";
import Filter from "../components/Filter";
import { Toaster } from "sonner";
const ProductsPage = () => {
  return (
    <>
      <Toaster richColors />
      <Container>
        <Row>
          <Filter />
        </Row>
      </Container>
    </>
  );
};

export default ProductsPage;
