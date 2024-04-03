import React from "react";
import { Typography } from "@material-tailwind/react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const FooterComp = () => {
  return (
    // <footer className="w-full p-8 color-nav-footer bg-slate-50">
    //   <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
    //     <img src="/logo.png" alt="logo-ct" className="img-fluid w-72" />
    //     <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
    //       <li>
    //         <Typography
    //           as="a"
    //           href="#"
    //           color="blue-gray"
    //           className="font-normal transition-colors boton no-underline"
    //         >
    //           Nosotros
    //         </Typography>
    //       </li>

    //       <li>
    //         <Typography
    //           as="a"
    //           href="#"
    //           color="blacky"
    //           className="font-normal transition-colors boton no-underline"
    //         >
    //           Contactanos{" "}
    //         </Typography>
    //       </li>
    //     </ul>
    //   </div>
    //   <hr className="my-8 border-blue-gray-50" />
    //   <Typography color="blue-gray" className="text-center font-normal">
    //     &copy; 2024 Tukson Clothes | Todos los derechos reservados.
    //   </Typography>
    // </footer>
    <footer className="mt-24 color-nav-footer">
      <Row className=" mx-0">
        <Col lg={12} className="flex justify-center">
          <div>
            <Link to={"/"}>
              <img src="logo.png" alt="Logo Tukson Clothes" className="w-44" />
            </Link>
          </div>
        </Col>
        <Col lg={12} sm={12} className="flex">
          <div className="mx-auto">
            <div className="mx-auto grid w-full"></div>
            <div className="flex w-full flex-col  justify-items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row ">
              <Typography
                variant="small"
                className=" font-normal text-blue-gray-900 md:mb-0  "
              >
                &copy; {}Tukson Clothes. All Rights Reserved.
              </Typography>
              <div className="flex gap-4  text-blue-gray-900 sm:justify-center ">
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                  <li>
                    <Typography
                      as="a"
                      href="#"
                      color="blue-gray"
                      className="font-normal transition-colors boton no-underline"
                    >
                      Nosotros
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      as="a"
                      href="#"
                      color="black"
                      className="font-normal transition-colors boton no-underline"
                    >
                      Contáctanos{" "}
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default FooterComp;
