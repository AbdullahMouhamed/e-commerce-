import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"
import { Navigate, useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"
import { Helmet } from 'react-helmet';



export default function Signup() {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    const phoneRegex = /^(02)?01[0125][0-9]{8}$/
    const validationSchema = object({
        name: string().required("Name is required").min(3, "name must be at least 3 characters").max(25, "name can not be more than 25 characters"),
        email: string().required("Email is required").email("Email is invalid"),
        password: string().required("Password is required").matches(passwordRegex, 'password should be at least Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
        rePassword: string().required("confirm password").oneOf([ref("password")], "password and confirmed password should be the same"),
        phone: string().required('phone is required').matches(phoneRegex, "sorry we accept egyptian phone numbers only")
    })
    const navigate = useNavigate()
    const [accountExistError, setAccountExistError] = useState(null)


    async function sendDataToRegister(values) {

        const loadingToastId = toast.loading("waiting...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
                method: "post",
                data: values,
            }

            let { data } = await axios.request(options)
            if (data.message == "success") {
                toast.success("User Created Successfully")

                setTimeout(() => {
                    navigate('/login')
                }, 1500)
            }


        } catch (error) {
            setAccountExistError(error.response.data.message)
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(loadingToastId)
        }
    }




    const formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        validationSchema,
        onSubmit: sendDataToRegister
    })



    return (
        <>
            <Helmet>
                <title> signup page</title>
            </Helmet>
            <h1 className="text-xl text-slate-600 font-semibold mb-5"><i className="fa-regular fa-user"></i> Register now</h1>
            <form action="" className="space-y-3" onSubmit={formik.handleSubmit}>

                <div className="name">
                    <input
                        onBlur={formik.handleBlur}
                        className="form-control w-full" type="text" placeholder="Type your name" value={formik.values.name} name="name" onChange={formik.handleChange} />
                    {formik.errors.name && formik.touched.name && <p className="text-red-600 mt-2 text-sm"> *{formik.errors.name}</p>}
                </div>
                <div className="email">
                    <input
                        onBlur={formik.handleBlur} className="form-control w-full" type="email" placeholder="Type your email" value={formik.values.email} name="email" onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-2 text-sm"> *{formik.errors.email}</p>}
                    {accountExistError && (<p className="text-red-600 mt-2 text-sm"> *{accountExistError}</p>)}
                </div>
                <div className="password">
                    <input
                        onBlur={formik.handleBlur} className="form-control w-full" type="password" placeholder="Type your password" value={formik.values.password} name="password" onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password && <p className="text-red-600 mt-2 text-sm"> *{formik.errors.password}</p>}
                </div>
                <div className="rePassword">
                    <input
                        onBlur={formik.handleBlur} className="form-control w-full" type="password" placeholder="Re type your password" value={formik.values.rePassword} name="rePassword" onChange={formik.handleChange} />
                    {formik.errors.rePassword && formik.touched.rePassword && <p className="text-red-600 mt-2 text-sm"> *{formik.errors.rePassword}</p>}
                </div>
                <div className="phone">
                    <input
                        onBlur={formik.handleBlur} className="form-control w-full" type="tel" placeholder="Type your phone number" value={formik.values.phone} name="phone" onChange={formik.handleChange} />
                    {formik.errors.phone && formik.touched.phone && <p className="text-red-600 mt-2 text-sm"> *{formik.errors.phone}</p>}
                </div>
                <button type="submit" className="btn w-full">Sign Up</button>
            </form>

        </>
    )
}
