import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
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
import Icono from "./Icono";
import { Link } from "react-router-dom";
const sortOptions = [
  {
    name: "Remeras",
    icon: "camiseta",
    current: false,
    href: "",
  },
  {
    name: "Jeans",
    icon: "moda",
    current: false,
    href: "",
  },
  {
    name: "Camperas",
    icon: "chaqueta",
    current: false,
    href: "",
  },
  {
    name: "Buzos",
    icon: "sudadera",
    current: false,
    href: "",
  },
  {
    name: "Gorras",
    icon: "gorra",
    current: false,
    href: "",
  },
  {
    name: "Calzado",
    icon: "zapato",
    current: false,
    href: "",
  },
];

const products = [
  {
    name: "Apple AirPods",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 95.0,
    desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
  },
  {
    name: "Apple AirPods",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 95.0,
    desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
  },
  {
    name: "Apple AirPods",
    img: "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
    price: 95.0,
    desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Filter = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        {/* <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              ></Transition.Child>
            </div>
          </Dialog>
        </Transition.Root> */}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 mt-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Filtrar
            </h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Categorías
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
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
                                  : "text-gray-500",
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
            {products.map((prod, index) => (
              <Col
                lg={4}
                md={6}
                sm={12}
                key={index}
                className="flex justify-center"
              >
                <Card className="w-72">
                  <CardHeader shadow={true} floated={false}>
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <hr />
                  <CardBody>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography color="blue-gray" className="font-medium">
                        {prod.name}
                      </Typography>
                      <Typography color="blue-gray" className="font-medium">
                        ${prod.price}
                      </Typography>
                    </div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-75"
                    >
                      {prod.desc}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <ModalProd prod={prod}/>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Filter;
