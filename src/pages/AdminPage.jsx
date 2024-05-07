import React, { useEffect, useState } from "react";
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
  const token = JSON.parse(sessionStorage.getItem("token"));

  const [users, setUsers] = useState([]);
  const [usersAux, setUsersAux] = useState([]);
  const [products, setProducts] = useState([]);
  const [tabOption, setTabOption] = useState("Productos");

  const getProducts = async () => {
    try {
      const res = await clientAxios.get("/productos");
      setProducts(res.data.allProds);
    } catch (error) {
      toast.error("Al parecer hubo un error", {
        description: error,
      });
    }
  };
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
      const res = response.ok && (await response.json());
      setUsers(res.allUsers);
      setUsersAux(res.allUsers);
    } catch (error) {
      toast.error("Al parecer hubo un error", {
        description: error,
      });
    }
  };

  useEffect(() => {
    if (tabOption === "Productos" && products.length === 0) getProducts();
    else if (tabOption === "Usuarios" && users.length === 0) getUsers();
  }, [tabOption]);

  // const searcher = (ev) => {
  //   const { value } = ev.target;
  //   setSearch(value.toLowerCase());
  // };

  return (
    <Tabs value="Productos">
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
            <TableComp
              value={tabOption}
              data={products}
              setData={setProducts}
            />
          </TabPanel>
        ) : (
          <TabPanel value={tabOption}>
            <TableComp
              tabOption={tabOption}
              data={users}
              setData={setUsers}
              dataAux={usersAux}
            />
          </TabPanel>
        )}
      </TabsBody>
    </Tabs>
  );
};

export default AdminPage;
