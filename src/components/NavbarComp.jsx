import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Icono from "./Icono";
import Cart from "./Cart";
import RegisterComp from "./RegisterComp";
import LoginComp from "./LoginComp";

const navListMenuItems = [
  {
    title: "Remeras",

    icon: "camiseta",
  },
  {
    title: "Jeans",

    icon: "moda",
  },
  {
    title: "Camperas",

    icon: "chaqueta",
  },
  {
    title: "Buzos",

    icon: "sudadera",
  },
  {
    title: "Gorras",

    icon: "gorra",
  },
  {
    title: "Calzado",

    icon: "zapato",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(({ icon, title }, key) => (
    <a href="#" key={key} className="no-underline">
      <MenuItem className="flex items-center gap-3 rounded-lg ">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          <Icono icon={icon} />
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm  boton  "
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium ">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium boton"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Nuestros productos
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl  lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none  outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
function NavList() {
  const [carrito, setCarrito] = useState(false);
  const mostrarCarrito = () => {
    setCarrito(true);
  };
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/"
        variant="small"
        color="blue-gray"
        className="font-medium no-underline"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4  boton ">
          Inicio
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="button"
        color="blue-gray"
        className="font-medium no-underline"
      >
        <Cart />
      </Typography>
    </List>
  );
}

const NavbarComp = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <Navbar className=" px-4 py-1  color-nav-footer bg-slate-50 rounded-none  ">
      <div className="flex items-center justify-between">
        <img src="/logo2.png" alt="Logo Tukson Clothes" className="img-fluid w-32" />
        <div className="hidden lg:flex mx-auto">
          <NavList />
          <LoginComp />
          <RegisterComp />
        </div>

     
        <Button
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </Button>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap  justify-content-center items-center gap-2 lg:hidden">
          <Button
            variant="text"
            className="boton "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Registrarse
          </Button>
          <Button
            variant="text"
            className="boton "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            Iniciar sesión
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComp;
