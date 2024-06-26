import { Button } from "@material-tailwind/react";
import { Formik } from "formik";
import React, { useState } from "react";
import { errorRegisterSchema } from "../utils/validationSchema";
import Swal from "sweetalert2";
import clientAxios, { config } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

const RegisterComp = ({ type }) => {
  const [viewPass, setViewPass] = useState(false);
  const [viewRepeatPass, setViewRepeatPass] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleViewRepeatPass = () => setViewRepeatPass(!viewRepeatPass);
  const handleViewPass = () => setViewPass(!viewPass);

  const createUser = async ({ name, email, pass, repeatPass }) => {
    try {
      if (pass !== repeatPass) {
        return Swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden",
          text: "Revisa los datos ingresados",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      const res = await clientAxios.post(
        "/usuarios",
        {
          name,
          email,
          pass,
        },
        config
      );
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: res.data.msg,
          text: "Ya puedes iniciar sesión",
          showConfirmButton: false,
          timer: 2000,
        });
        handleClose();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Al parecer hubo un error",
        text: error.response.data?.msg || error.response.data[0]?.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      {type === "banner" ? (
        <button
          className="flex-none no-underline text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          aria-label="Register Button"
          onClick={handleShow}
        >
          Registrarse ahora <span aria-hidden="true">&rarr;</span>
        </button>
      ) : (
        <Button
          variant="text"
          className="boton p-0 h-min normal-case text-sm my-2 rounded-none"
          onClick={handleShow}
        >
          Registrarse
        </Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <div className="modal-content">
          <div className="modal-body color-nav-footer rounded-lg">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className=" text-center font-bold text-gray-900">
                  Creá tu cuenta
                </h1>
                <img
                  className="mx-auto w-44"
                  src="logo.png"
                  alt="Your Company"
                />
              </div>
              <Formik
                initialValues={{
                  email: "",
                  name: "",
                  pass: "",
                  repeatPass: "",
                }}
                validationSchema={errorRegisterSchema}
                onSubmit={(values) => createUser(values)}
              >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="max-w-sm mx-auto">
                      <label
                        htmlFor="emailId"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                            />
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="emailId"
                          placeholder="example@email.com"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          className={`bg-gray-50 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 ${
                            errors.email && touched.email && "is-invalid"
                          }`}
                        />
                      </div>
                      <small className="text-danger">
                        {errors.email && touched.email && errors.email}
                      </small>
                      <label
                        htmlFor="nameId"
                        className="block mb-2 text-sm font-medium text-gray-900 mt-3"
                      >
                        Nombre y apellido
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="nameId"
                          placeholder="Ej: Juan Martinez"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 ${
                            errors.name && touched.name && "is-invalid"
                          }`}
                        />
                      </div>
                      <small className="text-danger">
                        {errors.name && touched.name && errors.name}
                      </small>
                      <label
                        htmlFor="passId"
                        className="block mb-2 text-sm font-medium text-gray-900 mt-3"
                      >
                        Contraseña
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                            />
                          </svg>
                        </div>
                        <input
                          type={!viewPass ? "password" : "text"}
                          id="passId"
                          placeholder="***********"
                          name="pass"
                          value={values.pass}
                          onChange={handleChange}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 ${
                            errors.pass && touched.pass && "is-invalid"
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 end-2 flex items-center"
                          onClick={handleViewPass}
                          aria-label="viewPassButton"
                        >
                          {viewPass ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 hover:text-orange-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 hover:text-orange-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <small className="text-danger">
                        {errors.pass && touched.pass && errors.pass}
                      </small>
                      <label
                        htmlFor="repeatPassId"
                        className="block mb-2 text-sm font-medium text-gray-900 mt-3"
                      >
                        Repetir contraseña
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                            />
                          </svg>
                        </div>
                        <input
                          type={!viewRepeatPass ? "password" : "text"}
                          id="repeatPassId"
                          placeholder="***********"
                          name="repeatPass"
                          value={values.repeatPass}
                          onChange={handleChange}
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 ${
                            errors.repeatPass &&
                            touched.repeatPass &&
                            "is-invalid"
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 end-2 flex items-center"
                          onClick={handleViewRepeatPass}
                          aria-label="viewRepeatPassButton"
                        >
                          {viewRepeatPass ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 hover:text-orange-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 hover:text-orange-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <small className="text-danger">
                        {errors.repeatPass &&
                          touched.repeatPass &&
                          errors.repeatPass}
                      </small>
                      <div className="mt-4">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Registrarse
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterComp;
