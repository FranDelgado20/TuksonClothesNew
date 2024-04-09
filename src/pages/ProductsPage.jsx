import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import ModalProd from "../components/ModalProd";
import Filter from "../components/Filter";
const ProductsPage = () => {
  return (
    <Container>
      <Row>
        <Filter />
      </Row>
    </Container>
  );
};

export default ProductsPage;
