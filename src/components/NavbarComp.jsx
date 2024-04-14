import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = navListMenuItems.map(({ icon, title }, key) => (
    <MenuItem className="flex items-center rounded-lg " key={key}>
      <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
        <Icono icon={icon} />
      </div>
      <div>
        <Link className="no-underline" to={""}>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm boton"
          >
            {title}
          </Typography>
        </Link>
      </div>
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <Link to={"/products"} className="no-underline">
        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-medium">
              <ListItem
                className="flex items-center gap-2 p-0 boton font-bold my-2"
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
          <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
            <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0 m-0 p-0">
              {renderItems}
            </ul>
          </MenuList>
        </Menu>
      </Link>
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
    <>
      <Link to={"/"} className="no-underline font-bold text-sm">
        <ListItem className="flex items-center gap-2 p-0 boton my-2">
          Inicio
        </ListItem>
      </Link>
      <NavListMenu />
      <Cart />
    </>
  );
}

const NavbarComp = () => {
  const [openNav, setOpenNav] = useState(false);

  const token = JSON.parse(sessionStorage.getItem("token"))

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <Navbar className=" px-4 py-1 color-nav-footer bg-slate-50 rounded-none">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <img
            src="/logo3.png"
            alt="Logo Tukson Clothes"
            className="img-fluid w-32"
          />
        </Link>
        <div className="hidden lg:flex align-items-center mx-auto gap-5">
          <NavList />
        </div>
        <div className="hidden lg:flex gap-3">
          {
            !token ?
            <>
            <LoginComp />
            <RegisterComp />
            </>
            :
            <>
            <ListItem>Hola</ListItem>
            <ListItem>Hola</ListItem>
            </>
          }
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 text-gray-950" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-950" strokeWidth={2} />
          )}
        </Button>
      </div>
      <Collapse open={openNav} className="flex flex-col">
        <NavList />
        <div className="flex flex-col justify-start align-items-start lg:hidden">
          {
            !token ?
            <>
            <LoginComp />
            <RegisterComp />
            </>
            :
            <>
            <ListItem>Hola</ListItem>
            <ListItem>Hola</ListItem>
            </>
          }
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComp;
