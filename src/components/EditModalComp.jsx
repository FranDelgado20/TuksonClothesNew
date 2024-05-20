import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { InputGroup, Modal } from "react-bootstrap";
import { toast } from "sonner";
import {
  Cog6ToothIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Form from "react-bootstrap/Form";
import { errorEditUserSchema } from "../utils/validationSchema";

const EditModalComp = ({ type, data, setData, setDataAux }) => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editUser = async ({ name, role }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_BACK_DEPLOY}/usuarios/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            role,
          }),
        }
      );
      const res = await response.json();
      const { msg, updatedUser, status } = res;

      if (status === 200) {
        toast.success(msg);
        setData((prevUsers) =>
          prevUsers.map((user) =>
            user._id === data._id ? { ...user, ...updatedUser } : user
          )
        );
        setDataAux((prevUsers) =>
          prevUsers.map((user) =>
            user._id === data._id ? { ...user, ...updatedUser } : user
          )
        );
        handleClose();
      }
    } catch (error) {
      toast.error("Al parecer hubo un error", {
        description: error,
      });
    }
  };

  return (
    <>
      {type === "user" ? (
        <>
          <Tooltip
            content="Editar usuario"
            className="bg-gray-100 text-gray-900"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <IconButton
              variant="text"
              className="hover:text-green-600"
              onClick={handleShow}
            >
              <PencilIcon className="h-6 w-6" />
            </IconButton>
          </Tooltip>
          <Modal show={show} onHide={handleClose}>
            <div className="modal-content">
              <div className="modal-body color-nav-footer rounded-lg">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center font-bold text-gray-900">
                      Edita este usuario
                    </h1>
                    <img
                      className="mx-auto w-44"
                      src="/logo.png"
                      alt="Logo Tukson Clothes"
                    />
                  </div>
                  <Formik
                    initialValues={{
                      name: data.name,
                      role: data.role,
                    }}
                    validationSchema={errorEditUserSchema}
                    onSubmit={(values) => editUser(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <Form className="text-sm">
                        <Form.Group className="mb-3" controlId="nameId">
                          <Form.Label>Nombre y apellido</Form.Label>
                          <InputGroup>
                            <InputGroup.Text id="nameGroup">
                              <UserCircleIcon className="w-5" />
                            </InputGroup.Text>
                            <Form.Control
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
                              disabled={data.role === "admin"}
                            >
                              <option value="user">Usuario</option>
                              <option value="admin">Administrador</option>
                            </Form.Select>
                          </InputGroup>
                          <small className="text-danger">
                            {errors.role && touched.role && errors.role}
                          </small>
                        </Form.Group>
                        <Button
                          type="submit"
                          className="w-full normal-case text-md bg-orange-600 transition hover:bg-orange-800"
                          size="sm"
                          onClick={handleSubmit}
                        >
                          Guardar cambios
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
        ""
      )}
    </>
  );
};

EditModalComp.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  setDataAux: PropTypes.func.isRequired,
};

export default EditModalComp;
