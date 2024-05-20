import * as yup from 'yup'

export const errorRegisterSchema = yup.object().shape({
    email: yup.string().email("Formato de correo electrónico inválido").required("Campo correo electrónico obligatorio"),
    name: yup.string().required("Campo nombre y apellido obligatorio"),
    pass: yup.string().required("Campo contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
    repeatPass: yup.string().required("Campo repetir contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
})
export const errorCreateUserSchema = yup.object().shape({
    email: yup.string().email("Formato de correo electrónico inválido").required("Campo correo electrónico obligatorio"),
    name: yup.string().required("Campo nombre y apellido obligatorio"),
    role: yup.string().required("Campo rol del usuario obligatorio"),
    pass: yup.string().required("Campo contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
})
export const errorCreateProductSchema = yup.object().shape({
    nombre: yup.string().required("Campo nombre del producto obligatorio"),
    categoria: yup.string().required("Campo categoría del producto obligatorio"),
    descripcion: yup.string().required("Campo descripción del producto obligatorio"),
    precio: yup.number().required("Campo precio del producto obligatorio"),
    imagen: yup.string().required("Campo imagen del producto obligatorio"),
})
export const errorEditUserSchema = yup.object().shape({
    name: yup.string().required("Campo nombre y apellido obligatorio"),
    role: yup.string().required("Campo rol del usuario obligatorio"),
})
export const errorLoginSchema = yup.object().shape({
    email: yup.string().email('Formato Email inválido').required('Campo correo electrónico obligatorio'),
    pass: yup.string().required("Campo contraseña obligatorio")
})