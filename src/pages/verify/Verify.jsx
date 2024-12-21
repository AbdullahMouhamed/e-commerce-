
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Helmet } from 'react-helmet';
export default function Verify() {







    async function handleVerify() {
        const toastId = toast.loading(" please wait ...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                method: "POST",
                data: {
                    "resetCode": formik.values.resetCode
                }
            }
            console.log(options.data);

            let { data } = await axios.request(options)
            if (data.statusMsg == "success") {
                toast.success(data.message)
                navigate("/")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)


        } finally {

            toast.dismiss(toastId)
        }


    }



    const formik = useFormik({
        initialValues: {

            "resetCode": "",

        },
        onSubmit: handleVerify
    })


    return (
        <>
            <Helmet>
                <title> verify page</title>
            </Helmet>
            <form onSubmit={formik.handleSubmit} className=' mt-10 flex-col flex gap-4'>
                <div className="resetCode">
                    <input
                        onBlur={formik.handleBlur} className="form-control w-full" type="text" placeholder="Type the reset code" value={formik.values.resetCode} name="resetCode" onChange={formik.handleChange} />
                </div>
                <button type="submit" className="btn w-full">Verify</button>
            </form>

        </>
    )
}
