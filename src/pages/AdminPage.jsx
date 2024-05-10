import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import TableComp from "../components/TableComp";
import clientAxios from "../utils/axiosClient";
import { toast } from "sonner";
import { Spinner } from "react-bootstrap";

const AdminPage = () => {
  const menu = [
    {
      title: "Productos",
      value: "Productos",
      icon: ShoppingBagIcon,
    },
    {
      title: "Usuarios",
      value: "Usuarios",
      icon: UserIcon,
    },
  ];

  const [users, setUsers] = useState([]);
  const [usersAux, setUsersAux] = useState([]);
  const [products, setProducts] = useState([]);
  const [tabOption, setTabOption] = useState("Usuarios");
  const [showSpinner, setShowSpinner] = useState(true);

  const memoizedSetUsers = useCallback((newUsers) => {
    setUsers(newUsers);
  }, []);
  const memoizedDataAux = useMemo(() => usersAux, [usersAux]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const getUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_BACK_DEPLOY}/usuarios`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = await response.json();
        memoizedSetUsers(res.allUsers);
        setUsersAux(res.allUsers);
        setShowSpinner(false);
      } catch (error) {
        toast.error("Al parecer hubo un error", {
          description: error,
        });
      }
    };
    const getProducts = async () => {
      try {
        const res = await clientAxios.get("/productos");
        setProducts(res.data.allProds);
        setShowSpinner(false);
      } catch (error) {
        toast.error("Al parecer hubo un error", {
          description: error,
        });
      }
    };
    getUsers();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs value={tabOption}>
      <TabsHeader>
        {menu.map(({ title, value, icon }) => (
          <Tab key={value} value={value} onClick={() => setTabOption(value)}>
            <div className="flex items-center gap-2 z-20">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {title}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {tabOption === "Productos" ? (
          <TabPanel value={tabOption}>
            {showSpinner ? (
              <div className="text-center my-5">
                <Spinner />
                <h5 className="mt-3">Cargando información...</h5>
              </div>
            ) : (
              <TableComp
                value={tabOption}
                data={products}
                // setData={setProducts}
              />
            )}
          </TabPanel>
        ) : (
          <TabPanel value={tabOption}>
            {showSpinner ? (
              <div className="text-center my-5">
                <Spinner />
                <h5 className="mt-3">Cargando información...</h5>
              </div>
            ) : (
              <TableComp
                tabOption={tabOption}
                data={users}
                setData={memoizedSetUsers}
                dataAux={memoizedDataAux}
              />
            )}
          </TabPanel>
        )}
      </TabsBody>
    </Tabs>
  );
};

export default AdminPage;