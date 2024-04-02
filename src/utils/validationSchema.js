import * as yup from 'yup'

export const errorRegisterSchema = yup.object().shape({
    email: yup.string().email("Formato de correo electrónico inválido").required("Campo correo electrónico obligatorio"),
    name: yup.string().required("Campo nombre y apellido obligatorio"),
    pass: yup.string().required("Campo contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
    repeatPass: yup.string().required("Campo repetir contraseña obligatorio").min(8, "La contraseña debe ser de al menos 8 caracteres"),
})
export const errorLoginSchema = yup.object().shape({
    email: yup.string().email('Formato Email inválido').required('Campo correo electrónico obligatorio'),
    pass: yup.string().required("Campo contraseña obligatorio")
})