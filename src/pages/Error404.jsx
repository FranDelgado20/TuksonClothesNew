import { Button } from "@material-tailwind/react";
import React from "react";
import { Container } from "react-bootstrap";

const Error404 = () => {
  return (
    <Container fluid >
      <div className="flex justify-center">
        <img src="/Error.png" alt="" />
      </div>
      <div className="flex justify-center">
        <Button>Volver al inicio</Button>
      </div>
    </Container>
  );
};

export default Error404;
