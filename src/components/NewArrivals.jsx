import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <Row className="mx-auto">
        <Col sm={12} lg={6} className="flex justify-center my-3">
          <div className="pt-4 sm:pt-24 lg:pb-48 lg:py-40">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  La moda llegó a Tukson Clothes
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                  Anímate a explorar nuestra tienda online y prepárate para
                  elevar tu estilo con nosotros
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  to="/productos"
                  className="inline-block rounded-md border border-transparent px-8 py-3 text-center font-medium text-black no-underline color-nav-footer hover:bg-orange-700 transition"
                >
                  Ver colección
                </Link>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} lg={6} className="flex justify-items-center my-3">
          <img
            src="/productos/remeras.png"
            alt="Imagen remera"
            className="img-fluid object-contain"
          />
        </Col>
      </Row>
    </div>
  );
};

export default NewArrivals;
