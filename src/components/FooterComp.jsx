import { Typography } from "@material-tailwind/react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const FooterComp = () => {
  return (
    <footer className="mt-24 color-nav-footer">
      <Row className="mx-0">
        <Col lg={12} className="flex justify-center my-3">
          <Link to={"/"}>
            <img
              src="/logo3.png"
              alt="Logo Tukson Clothes"
              className="w-44"
            />
          </Link>
        </Col>
        <Col sm={12} className="flex justify-center gap-4">
          <Link to={"/about"} className="no-underline">
            <Typography
              color="blue-gray"
              className="font-normal transition-colors boton no-underline"
            >
              Nosotros
            </Typography>
          </Link>
          <Link to={"/contact"} className="no-underline">
            <Typography
              color="blue-gray"
              className="font-normal transition-colors boton no-underline"
            >
              Contáctanos
            </Typography>
          </Link>
        </Col>
        <Col lg={12} sm={12} className="flex justify-center my-3">
          <Typography variant="small" className="mb-0">
            &copy; {}Tukson Clothes. All Rights Reserved.
          </Typography>
        </Col>
      </Row>
    </footer>
  );
};

export default FooterComp;
