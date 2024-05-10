import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TABLE_HEAD_USERS = [
  "Foto de perfil",
  "Nombre",
  "Correo electrónico",
  "Rol",
  "Editar",
  "Eliminar",
];

const TableComp = ({ tabOption, data, setData, dataAux }) => {
  const classes = "p-4 border-b border-blue-gray-50";

  const [search, setSearch] = useState("");
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
    setData(dataAux);
  }, [search, dataAux, setData]);

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
                <Button className="flex items-center gap-1" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Crear
                  usuario
                </Button>
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
                placeholder="Busque su usuario..."
                className={
                  "bg-gray-100 text-gray-900 text-sm rounded-lg block ps-10 p-2.5 widthBuscador"
                }
                onChange={(ev) => setSearch(ev.target.value.toLowerCase())}
              />
            </div>
          </CardHeader>
          <CardBody>
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
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map(({ name, email, img, role }, index) => (
                    <tr key={index}>
                      <td className={classes}>
                        <img
                          src={img}
                          alt={name}
                          className="max-w-28 rounded-full"
                        />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {role === "admin" ? "Administrador" : "Usuario"}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Editar usuario">
                          <IconButton variant="text">
                            <PencilIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Eliminar usuario">
                          <IconButton variant="text">
                            <TrashIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h1 className="text-center my-5">
                No existen resultados para su búsqueda
              </h1>
            )}
          </CardBody>
        </Card>
      ) : (
        ""
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
};
