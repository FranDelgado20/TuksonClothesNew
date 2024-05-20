import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { InputGroup, Modal } from "react-bootstrap";
import {
  errorCreateProductSchema,
  errorCreateUserSchema,
} from "../utils/validationSchema";
import { toast } from "sonner";
import clientAxios, { config } from "../utils/axiosClient";
import {
  AtSymbolIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PaperClipIcon,
  PhotoIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Form from "react-bootstrap/Form";

const CATEGORIES = [
  "Sin seleccionar categoría",
  "Remeras",
  "Jeans",
  "Camperas",
  "Buzos",
  "Gorras",
  "Calzado",
];

const CreateModalComp = ({ type, setData, setDataAux, data }) => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const [viewPass, setViewPass] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createUser = async ({ name, email, pass, role }) => {
    try {
      const res = await clientAxios.post(
        "/usuarios",
        {
          name,
          email,
          pass,
          role,
        },
        config
      );
      if (res.status === 201) {
        const { msg, newUser } = res.data;

        toast.success(msg);
        setData([...data, newUser]);
        setDataAux([...data, newUser]);

        handleClose();
      }
    } catch (error) {
      toast.error("Al parecer hubo un error", {
        description: error.response.data?.msg || error.response.data[0]?.msg,
      });
    }
  };

  const createProduct = async ({
    nombre,
    precio,
    categoria,
    descripcion,
    imagen,
  }) => {
    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("categoria", categoria);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);

    const response = await fetch(
      `${import.meta.env.VITE_URL_BACK_DEPLOY}/productos`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const res = await response.json();

    if (res.status === 201) {
      let newProd = {
        nombre,
        precio,
        categoria,
        descripcion,
        imagen: URL.createObjectURL(imagen),
      };
      setData([...data, newProd]);
      setDataAux([...data, newProd]);

      handleClose();

      return res;
    } else {
      throw new Error(res[0].msg || res);
    }
  };
  const handleToastClick = (values) => {
    toast.promise(createProduct(values), {
      loading: "Creando producto...",
      success: (data) => {
        return data.msg;
      },
      error: (error) => {
        return error;
      },
    });
  };
  return (
    <>
      {type === "user" ? (
        <>
          <Button
            className="flex items-center gap-1"
            size="sm"
            onClick={handleShow}
          >
            <UserPlusIcon className="w-5" /> Crear usuario
          </Button>
          <Modal show={show} onHide={handleClose}>
            <div className="modal-content">
              <div className="modal-body color-nav-footer rounded-lg">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center font-bold text-gray-900">
                      Creá un nuevo usuario
                    </h1>
                    <img
                      className="mx-auto w-44"
                      src="/logo.png"
                      alt="Logo Tukson Clothes"
                    />
                  </div>
                  <Formik
                    initialValues={{
                      email: "",
                      name: "",
                      role: "",
                      pass: "",
                    }}
                    validationSchema={errorCreateUserSchema}
                    onSubmit={(values) => createUser(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <Form className="text-sm">
                        <Form.Group className="mb-3" controlId="emailId">
                          <Form.Label>Correo electrónico</Form.Label>
                          <InputGroup>
                            <InputGroup.Text id="emailGroup">
                              <AtSymbolIcon className="w-5" />
                            </InputGroup.Text>
                            <Form.Control
                              placeholder="name@example.com"
                              aria-describedby="emailGroup"
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              className={
                                errors.email && touched.email && "is-invalid"
                              }
                            />
                          </InputGroup>
                          <small className="text-danger">
                            {errors.email && touched.email && errors.email}
                          </small>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nameId">
                          <Form.Label>Nombre y apellido</Form.Label>
                          <InputGroup>
                            <InputGroup.Text id="nameGroup">
                              <UserCircleIcon className="w-5" />
                            </InputGroup.Text>
                            <Form.Control
                              placeholder="Ej: Juan Martinez"
                              aria-describedby="nameGroup"
                              type="text"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              className={
                                errors.name && touched.name && "is-invalid"
                              }
                            />
                          </InputGroup>
                          <small className="text-danger">
                            {errors.name && touched.name && errors.name}
                          </small>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="roleId">
                          <Form.Label>Rol del usuario</Form.Label>
                          <InputGroup>
                            <InputGroup.Text id="roleGroup">
                              <Cog6ToothIcon className="w-5" />
                            </InputGroup.Text>
                            <Form.Select
                              aria-describedby="roleGroup"
                              name="role"
                              value={values.role}
                              onChange={handleChange}
                              className={
                                errors.role && touched.role && "is-invalid"
                              }
                            >
                              <option value="">Rol no seleccionado</option>
                              <option value="user">Usuario</option>
                              <option value="admin">Administrador</option>
                            </Form.Select>
                          </InputGroup>
                          <small className="text-danger">
                            {errors.role && touched.role && errors.role}
                          </small>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="passId">
                          <Form.Label>Contraseña</Form.Label>
                          <InputGroup>
                            <InputGroup.Text id="passGroup">
                              <KeyIcon className="w-5" />
                            </InputGroup.Text>
                            <Form.Control
                              placeholder="************"
                              aria-describedby="passGroup"
                              type={!viewPass ? "password" : "text"}
                              name="pass"
                              value={values.pass}
                              onChange={handleChange}
                              className={
                                errors.pass && touched.pass && "is-invalid"
                              }
                            />
                            <InputGroup.Text id="viewPassButton">
                              <Button
                                variant="text"
                                className="p-1 hover:text-orange-500"
                                onClick={() => setViewPass(!viewPass)}
                              >
                                {!viewPass ? (
                                  <EyeSlashIcon className="w-5" />
                                ) : (
                                  <EyeIcon className="w-5" />
                                )}
                              </Button>
                            </InputGroup.Text>
                          </InputGroup>
                          <small className="text-danger">
                            {errors.pass && touched.pass && errors.pass}
                          </small>
                        </Form.Group>

                        <Button
                          type="submit"
                          className="w-full normal-case text-md bg-orange-600 transition hover:bg-orange-800"
                          size="sm"
                          onClick={handleSubmit}
                        >
                          Crear usuario
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <>
          <Button
            className="flex items-center gap-1"
            size="sm"
            onClick={handleShow}
          >
            <DocumentPlusIcon className="w-5" /> Crear producto
          </Button>
          <Modal show={show} onHide={handleClose}>
            <div className="modal-content">
              <div className="modal-body color-nav-footer rounded-lg">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center font-bold text-gray-900">
                      Creá un nuevo producto
                    </h1>
                    <img
                      className="mx-auto w-44"
                      src="/logo.png"
                      alt="Logo Tukson Clothes"
                    />
                  </div>
                  <Formik
                    initialValues={{
                      nombre: "",
                      precio: "",
                      categoria: "",
                      descripcion: "",
                      imagen: "",
                    }}
                    validationSchema={errorCreateProductSchema}
                    onSubmit={(values) => handleToastClick(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                    }) => (
                      <div>
                        <Form className="text-sm">
                          <Form.Group className="mb-3" controlId="nombreId">
                            <Form.Label>Nombre</Form.Label>
                            <InputGroup>
                              <InputGroup.Text id="nombreGroup">
                                <PaperClipIcon className="w-5" />
                              </InputGroup.Text>
                              <Form.Control
                                placeholder="Ej: Zapatillas Nike"
                                aria-describedby="nameGroup"
                                type="text"
                                name="nombre"
                                value={values.nombre}
                                onChange={handleChange}
                                className={
                                  errors.nombre &&
                                  touched.nombre &&
                                  "is-invalid"
                                }
                              />
                            </InputGroup>
                            <small className="text-danger">
                              {errors.nombre && touched.nombre && errors.nombre}
                            </small>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="precioId">
                            <Form.Label>Precio</Form.Label>
                            <InputGroup>
                              <InputGroup.Text id="precioGroup">
                                <CurrencyDollarIcon className="w-5" />
                              </InputGroup.Text>
                              <Form.Control
                                placeholder="$999"
                                aria-describedby="precioGroup"
                                type="number"
                                name="precio"
                                value={values.precio}
                                onChange={handleChange}
                                className={
                                  errors.precio &&
                                  touched.precio &&
                                  "is-invalid"
                                }
                              />
                            </InputGroup>
                            <small className="text-danger">
                              {errors.precio && touched.precio && errors.precio}
                            </small>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="roleId">
                            <Form.Label>Categoría</Form.Label>
                            <InputGroup>
                              <InputGroup.Text id="catGroup">
                                <TagIcon className="w-5" />
                              </InputGroup.Text>
                              <Form.Select
                                aria-describedby="catGroup"
                                name="categoria"
                                value={values.categoria}
                                onChange={handleChange}
                                className={
                                  errors.categoria &&
                                  touched.categoria &&
                                  "is-invalid"
                                }
                              >
                                {CATEGORIES.map((op) => (
                                  <option
                                    key={op}
                                    value={
                                      op === "Sin seleccionar categoría"
                                        ? ""
                                        : op
                                    }
                                  >
                                    {op}
                                  </option>
                                ))}
                              </Form.Select>
                            </InputGroup>
                            <small className="text-danger">
                              {errors.categoria &&
                                touched.categoria &&
                                errors.categoria}
                            </small>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="descId">
                            <Form.Label>Descripción</Form.Label>
                            <InputGroup>
                              <InputGroup.Text id="descGroup">
                                <DocumentTextIcon className="w-5" />
                              </InputGroup.Text>
                              <Form.Control
                                placeholder="Breve texto explicando características del producto"
                                aria-describedby="descGroup"
                                as={"textarea"}
                                rows={3}
                                name="descripcion"
                                value={values.descripcion}
                                onChange={handleChange}
                                className={
                                  errors.descripcion &&
                                  touched.descripcion &&
                                  "is-invalid"
                                }
                              />
                            </InputGroup>
                            <small className="text-danger">
                              {errors.descripcion &&
                                touched.descripcion &&
                                errors.descripcion}
                            </small>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="imgId">
                            <Form.Label>Imagen del producto</Form.Label>
                            <InputGroup>
                              <InputGroup.Text id="imgGroup">
                                <PhotoIcon className="w-5" />
                              </InputGroup.Text>
                              <Form.Control
                                aria-describedby="imgGroup"
                                type="file"
                                name="imagen"
                                onChange={(ev) => {
                                  setFieldValue("imagen", ev.target.files[0]);
                                }}
                                className={
                                  errors.imagen &&
                                  touched.imagen &&
                                  "is-invalid"
                                }
                                accept="image/jpeg, image/png, image/jpg, image/svg+xml, image/webp"
                              />
                            </InputGroup>
                            <small className="text-danger">
                              {errors.imagen && touched.imagen && errors.imagen}
                            </small>
                          </Form.Group>
                          {values.imagen && (
                            <div className="text-center my-3">
                              <img
                                src={URL.createObjectURL(values.imagen)}
                                alt={values.nombre}
                                className="rounded-lg"
                              />
                              <small className="font-bold">
                                Previsualización de imagen
                              </small>
                            </div>
                          )}

                          <Button
                            type="submit"
                            className="w-full normal-case text-md bg-orange-600 transition hover:bg-orange-800"
                            size="sm"
                            onClick={handleSubmit}
                          >
                            Crear producto
                          </Button>
                        </Form>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

CreateModalComp.propTypes = {
  type: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  setDataAux: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default CreateModalComp;
