import React from "react";
import { Col, Row } from "react-bootstrap";

const NewArrivals = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <Row className="mx-auto">
        <Col sm={12} lg={6} className="flex  justify-center">
          <div className=" pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  La moda llegó a Tukson Clothes
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                 Anímate a explorar nuestra tienda online y prepárate para elevar tu estilo con nosotros
                </p>
              </div>
              <div>
                <div className="mt-10">
                  <a
                    href="#"
                    className="inline-block rounded-md border border-transparent  px-8 py-3 text-center font-medium text-black no-underline color-nav-footer hover:bg-orange-700"
                  >
                    Ver colección
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} lg={6} className="flex justify-items-center">
          
            <img
              src="remeras.png"
              alt=""
              className="  img-fluid object-contain"
            />
        
         
        </Col>
      </Row>
    </div>
  );
};

export default NewArrivals;
