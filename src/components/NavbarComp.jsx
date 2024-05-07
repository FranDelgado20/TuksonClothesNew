import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
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
import { Link, useNavigate } from "react-router-dom";

const navListMenuItems = [
  {
    title: "Remeras",
    icon: "/iconosCategorias/camiseta",
  },
  {
    title: "Jeans",
    icon: "/iconosCategorias/moda",
  },
  {
    title: "Camperas",
    icon: "/iconosCategorias/chaqueta",
  },
  {
    title: "Buzos",
    icon: "/iconosCategorias/sudadera",
  },
  {
    title: "Gorras",
    icon: "/iconosCategorias/gorra",
  },
  {
    title: "Calzado",
    icon: "/iconosCategorias/zapato",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = navListMenuItems.map(({ icon, title }, key) => (
    <MenuItem className="flex items-center rounded-lg" key={key}>
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
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Link to={"/productos"} className="no-underline">
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
          </Link>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block z-10">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0 m-0 p-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}
function NavList({ role }) {
  return (
    <>
      <Link to={"/"} className="no-underline font-bold text-sm">
        <ListItem className="flex items-center gap-2 p-0 boton my-2">
          Inicio
        </ListItem>
      </Link>
      <NavListMenu />
      {role !== "admin" && <Cart />}
    </>
  );
}

const Authentication = ({ isAuthenticated, role, handleLogout }) => {
  return (
    <>
      {!isAuthenticated ? (
        <>
          <LoginComp />
          <RegisterComp />
        </>
      ) : isAuthenticated && role === "admin" ? (
        <>
          <Link
            to={"/administrador"}
            className="boton p-0 h-min normal-case text-sm my-2 flex align-items-center gap-1 no-underline font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Administrador
          </Link>
          <Button
            variant="text"
            className="boton p-0 h-min rounded normal-case text-sm my-2 flex align-items-center gap-1"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Cerrar sesión
          </Button>
        </>
      ) : (
        <>
          <Link
            to={""}
            className="boton p-0 h-min rounded normal-case text-sm my-2 flex align-items-center gap-1 no-underline font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Mi cuenta
          </Link>
          <Button
            variant="text"
            className="boton p-0 h-min rounded normal-case text-sm my-2 flex align-items-center gap-1"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Cerrar sesión
          </Button>
        </>
      )}
    </>
  );
};

const NavbarComp = () => {
  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      setIsAuthenticated(true);
      setRole(JSON.parse(sessionStorage.getItem("role")));
      setIdUser(JSON.parse(sessionStorage.getItem("idUser")));
    }
  }, [JSON.parse(sessionStorage.getItem("token"))]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("idUser");
    sessionStorage.removeItem("role");

    setRole("");
    setIdUser("");
    setIsAuthenticated(false);

    navigate("/");
  };

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
          <NavList role={role} />
        </div>
        <div className="hidden lg:flex gap-3">
          <Authentication
            isAuthenticated={isAuthenticated}
            role={role}
            handleLogout={handleLogout}
          />
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
          <Authentication
            isAuthenticated={isAuthenticated}
            role={role}
            handleLogout={handleLogout}
          />
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComp;
