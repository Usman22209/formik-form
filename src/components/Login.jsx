import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = () => {
    //validatating inputs using yup
    const validationSchema=yup.object({
        name:yup.string().min(3).required("Username required"),
        email:yup.string().email().required("Email required"),
        password:yup.string().min(6).required("Password required") .matches(/^(?=.*[0-9|!@#$%^&*])/, 'Password must contain at least one number or one special character'),
        confirm_password: yup.string().min(6).required("confirm password is required").oneOf([yup.ref("password"), null], "password don't match"),
        gender:yup.string().required("required")
    })
    //initializing values for input fields
    const init = {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        gender:"",
        remember_me:""
    }
    //getting functions and objects using destructuring
    const {values,handleChange,touched,handleBlur,handleSubmit,errors} = useFormik({
        initialValues: init,
        validationSchema:validationSchema,
        onSubmit: (value,action) => {
            console.log(value);
            setdata(data.concat(values));
            //clearing fields after user successfully submit data
            action.resetForm();
        }
    })
    return (
        <div className="min-h-screen flex items-start sm:items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer/>
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-[42px] font-bold text-gray-900">
                        Sign up for your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" noValidate onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-t-sm shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input id="name" name="name" type="text" autoComplete="off" required className={`appearance-none rounded-none relative block ${(values.name && !errors.name)?"bg-blue-50":""} w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                            {touched.name && errors.name && <p className={` text-red-600 text-sm ${errors.name?"p-1":""} `} >{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${(values.email && !errors.email)?"bg-blue-50":""} border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Email address" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                           {touched.email && errors.email && <p className={` text-red-600 text-sm ${errors.name?"p-1":""} `} >{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${(values.password && !errors.password)?"bg-blue-50":""} border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}  placeholder="Password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                           {touched.password && errors.password && <p className={` text-red-600 text-sm ${errors.password?"p-1":""} `} >{errors.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input id="confirm-password" name="confirm_password" type="password" autoComplete="current-password" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${(values.confirm_password && !errors.confirm_password)?"bg-blue-50":""} border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}  placeholder="Confirm Password" value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} />
                            {/* showing only when user touched data  */}
                            {touched.confirm_password && <p className={` text-red-600 text-sm ${errors.confirm_password?"p-1":""} `} >{errors.confirm_password}</p>}
                        </div>
                        <div>
                            <label htmlFor="gender" className="sr-only">Gender</label>
                            <select id="gender" name="gender" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${(values.gender!==""?(values.gender==="male"?"bg-blue-50":"bg-pink-50"):"")}
                             `} value={values.gender} onChange={handleChange} onBlur={handleBlur}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={()=>{
                            //checking whether login is successful or not
                            (errors.name || errors.email || errors.password || errors.confirm_password || values.name==="" || values.email==="" || values.password==="" || values.confirm_password==="")?toast.error("Login Unsuccesful"):toast.success("Login successfull")
                        }}>
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;