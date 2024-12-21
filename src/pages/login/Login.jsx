
import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { Navigate, useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"
import { UserContext } from "../../context/User.Context"
import { Helmet } from 'react-helmet';



export default function Login() {
    let { setToken } = useContext(UserContext)
    const [incorrectData, setIncorrectData] = useState()
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    const validationSchema = object({

        email: string().required("Email is required").email("Email is invalid"),
        password: string().required("Password is required").matches(passwordRegex, 'password should be at least Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
    })
    const navigate = useNavigate()



    async function sendDataToLogin(values) {


        const loadingToastId = toast.loading("waiting...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
                method: "post",
                data: values,
            }

            let { data } = await axios.request(options)
            if (data.message == 'success') {
                localStorage.setItem("token", data.token);
                setToken(data.token)
                toast.success("wellcome")
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            }
        } catch (error) {

            toast.error(error.response.data.message)
            setIncorrectData(error.response.data.message)

        } finally {
            toast.dismiss(loadingToastId)
        }





    }




    const formik = useFormik({
        initialValues: {

            "email": "",
            "password": "",


        },
        validationSchema,
        onSubmit: sendDataToLogin
    })



    return (
        <>
            <Helmet>
                <title>login page</title>
            </Helmet>
            <h1 className="text-xl text-slate-600 font-semibold mb-5"><i className="fa-regular fa-user"></i> Login</h1>
            <form action="" className="space-y-3" onSubmit={formik.handleSubmit}>
                <div className="email">
                    <input
                        onBlur={formik.handleBlur} className="form-control w-full" type="email" placeholder="Type your email" value={formik.values.email} name="email" onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-2 text-sm"> *{formik.errors.email}</p>}

                </div>
                <div className="password">
                    <input
                        onBlur={formik.handleBlur} className="form-control w-full" type="password" placeholder="Type your password" value={formik.values.password} name="password" onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password && <p className="text-red-600 mt-2 text-sm"> *{formik.errors.password}</p>}
                    {incorrectData && <p className="text-red-600 mt-2 text-sm"> *{incorrectData}</p>}
                </div>
                <button type="submit" className="btn w-full">Log In</button>
            </form>

        </>
    )
}

