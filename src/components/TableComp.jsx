import { TrashIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import Swal from "sweetalert2";
import CreateModalComp from "./CreateModalComp";
import EditModalComp from "./EditModalComp";

const TABLE_HEAD_USERS = [
  "Foto de perfil",
  "Nombre",
  "Correo electrónico",
  "Rol",
  "Editar",
  "Eliminar",
];
const TABLE_HEAD_PRODS = [
  "Producto",
  "Precio",
  "Categoría",
  "Descripción",
  "Talles",
  "Editar",
  "Eliminar",
];

const TableComp = ({ tabOption, data, setData, dataAux, setDataAux }) => {
  const classes = "p-4 border-b border-blue-gray-50";

  const token = JSON.parse(sessionStorage.getItem("token"));

  const [search, setSearch] = useState("");
  const [searchProd, setSearchProd] = useState("");
  const handleDeleteUser = (idUser, role) => {
    if (role === "admin") {
      toast.error("No es posible eliminar un administrador");
      return;
    }
    Swal.fire({
      title: "¿Estás seguro de borrar este usuario?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F78711",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_URL_BACK_DEPLOY}/usuarios/${idUser}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const res = await response.json();
          if (res.status === 200) {
            toast.success(res.msg);
            setData(data.filter((user) => user._id !== idUser));
            setDataAux(data.filter((user) => user._id !== idUser));
          }
        } catch (error) {
          toast.error("Al parecer hay un error", {
            description: error.msg,
          });
        }
      }
    });
  };

  const handleDeleteProduct = (idProd) => {
    Swal.fire({
      title: "¿Estás seguro de borrar este producto?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F78711",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_URL_BACK_DEPLOY}/productos/${idProd}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const res = await response.json();
          if (res.status === 200) {
            toast.success(res.msg);
            setData(data.filter((prod) => prod._id !== idProd));
            setDataAux(data.filter((prod) => prod._id !== idProd));
          }
        } catch (error) {
          toast.error("Al parecer hay un error", {
            description: error.msg,
          });
        }
      }
    });
  };

  useEffect(() => {
    if (search) {
      const result = dataAux.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search)
      );
      setData(result);
      return;
    } 
    else if (searchProd) {
      const result = dataAux.filter((item) =>
        item.nombre.toLowerCase().includes(searchProd)
      );
      setData(result);
      return;
    }
    setData(dataAux);
  }, [search, searchProd, dataAux, setData]);

  return (
    <>
      {tabOption === "Usuarios" ? (
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-4 tableHead">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Lista de usuarios registrados
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Observe la información de cada usuario
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <CreateModalComp
                  type={"user"}
                  setData={setData}
                  setDataAux={setDataAux}
                  data={data}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-full inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="searchId"
                placeholder="Busque un usuario..."
                className={
                  "bg-gray-100 text-gray-900 text-sm rounded-lg block ps-10 p-2.5 widthBuscador"
                }
                onChange={(ev) => setSearch(ev.target.value.toLowerCase())}
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll">
            {data.length > 0 ? (
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD_USERS.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => (
                    <tr key={user._id}>
                      <td className={classes}>
                        <img
                          src={user.img}
                          alt={user.name}
                          className="max-w-28 rounded-full"
                        />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.role === "admin" ? "Administrador" : "Usuario"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <EditModalComp
                          type="user"
                          data={user}
                          setData={setData}
                          setDataAux={setDataAux}
                        />
                      </td>
                      <td className={classes}>
                        <Tooltip
                          content="Eliminar usuario"
                          className="bg-gray-100 text-gray-900"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <IconButton
                            variant="text"
                            className="hover:text-red-600"
                            onClick={() =>
                              handleDeleteUser(user._id, user.role)
                            }
                          >
                            <TrashIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              data.length === 0 &&
              search && (
                <h1 className="text-center my-5">
                  No existen resultados para su búsqueda
                </h1>
              )
            )}
          </CardBody>
        </Card>
      ) : (
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-4 tableHead">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Lista de productos
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Observe la información de cada producto
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <CreateModalComp
                  type={"prod"}
                  setData={setData}
                  setDataAux={setDataAux}
                  data={data}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-full inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="searchId"
                placeholder="Busque un producto..."
                className={
                  "bg-gray-100 text-gray-900 text-sm rounded-lg block ps-10 p-2.5 widthBuscador"
                }
                onChange={(ev) => setSearchProd(ev.target.value.toLowerCase())}
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll">
            {data.length > 0 ? (
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD_PRODS.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((prod) => (
                    <tr key={prod._id}>
                      <td className={classes}>
                        <div className="flex flex-col gap-3">
                          <img
                            src={prod.imagen}
                            alt={prod.nombre}
                            className="max-w-48 rounded-full"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {prod.nombre}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          ${prod.precio}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {prod.categoria}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {prod.descripcion}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {!prod.talles
                            ? "todavia no hay talles xd"
                            : prod.talles}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {/* <EditModalComp
                        type="user"
                        data={user}
                        setData={setData}
                        setDataAux={setDataAux}
                      /> */}
                      </td>
                      <td className={classes}>
                        <Tooltip
                          content="Eliminar produco"
                          className="bg-gray-100 text-gray-900"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <IconButton
                            variant="text"
                            className="hover:text-red-600"
                            onClick={() => handleDeleteProduct(prod._id)}
                          >
                            <TrashIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              data.length === 0 &&
              searchProd && (
                <h1 className="text-center my-5">
                  No existen resultados para su búsqueda
                </h1>
              )
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
};
export default TableComp;

TableComp.propTypes = {
  tabOption: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  dataAux: PropTypes.array.isRequired,
  setDataAux: PropTypes.func.isRequired,
};
