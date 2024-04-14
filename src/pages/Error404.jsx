import { Button } from "@material-tailwind/react";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <Container fluid>
      <div className="flex justify-center align-items-center flex-col">
        <img src="/Error.png" alt="Imagen de Error 404" className="img-fluid" />
        <Link
          to={"/"}
          className="flex gap-1 rounded-md border border-transparent px-8 py-3 text-center font-medium text-black no-underline color-nav-footer hover:bg-orange-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </Container>
  );
};

export default Error404;
