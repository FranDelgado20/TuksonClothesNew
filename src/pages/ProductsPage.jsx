import { Container } from "react-bootstrap";
import { Toaster, toast } from "sonner";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Col, Row } from "react-bootstrap";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Icono from "../components/Icono";
import ModalProd from "../components/ModalProd";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clientAxios from "../utils/axiosClient";

const sortOptions = [
  {
    name: "Remeras",
    icon: "/iconosCategorias/camiseta",
    current: false,
    href: "",
  },
  {
    name: "Jeans",
    icon: "/iconosCategorias/moda",
    current: false,
    href: "",
  },
  {
    name: "Camperas",
    icon: "/iconosCategorias/chaqueta",
    current: false,
    href: "",
  },
  {
    name: "Buzos",
    icon: "/iconosCategorias/sudadera",
    current: false,
    href: "",
  },
  {
    name: "Gorras",
    icon: "/iconosCategorias/gorra",
    current: false,
    href: "",
  },
  {
    name: "Calzado",
    icon: "/iconosCategorias/zapato",
    current: false,
    href: "",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await clientAxios.get("/productos");

        if (res.status === 200) setProducts(res.data.allProds);
      } catch (error) {
        toast.error("Al parecer hubo un error", {
          description: error.response.data.msg,
        });
      }
    };
    getProducts();
  }, []);
  return (
    <>
      <Toaster richColors />
      <Container>
        <div className="mx-auto my-5 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 my-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Filtrar
            </h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    className="group inline-flex justify-cente items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Categorías
                    <ChevronDownIcon
                      aria-hidden="true"
                      className={`h-3 w-5 transition-transform lg:block ${
                        isOpen && "rotate-180"
                      }`}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              to={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-600",
                                active ? "bg-gray-100" : "",
                                "flex justify-start gap-2 py-2 no-underline ps-4"
                              )}
                            >
                              <Icono icon={option.icon} />
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <Row className="justify-center">
            {products.map((prod) => (
              <Col
                lg={3}
                md={6}
                sm={12}
                key={prod._id}
                className="flex justify-center my-3"
              >
                <Card className="w-72">
                  <CardHeader shadow={true} floated={false}>
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <hr />
                  <CardBody>
                    <div className="mb-2 md:flex items-center justify-between">
                      <Typography color="blue-gray" className="font-medium">
                        {prod.nombre}
                      </Typography>
                      <Typography color="blue-gray" className="font-medium">
                        ${prod.precio}
                      </Typography>
                    </div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-75"
                    >
                      {prod.descripcion}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <ModalProd prod={prod} />
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default ProductsPage;
