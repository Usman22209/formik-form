import * as Yup from "yup"
export const sign = Yup.object({

    name: Yup.string().min(3).max(30).required("*Username required"),
    email: Yup.string().email().required("Email require"),
    password: Yup.string().min(6).required("*Password required"),
    confirm_password: Yup.string().min(6).required().oneOf([Yup.ref("password"), null], "password don't match")

})