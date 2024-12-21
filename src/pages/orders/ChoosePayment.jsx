import { useFormik } from "formik"
import { useContext, useState } from "react"
import { CartContext } from './../../context/Cart.Context';
import { UserContext } from "../../context/User.Context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
export default function ChoosePayment() {
    const { cartInfo } = useContext(CartContext)
    const { token } = useContext(UserContext)
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState(null)
    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: "",
            },
        },
        onSubmit: (values) => {
            if (paymentMethod == "cash") {
                cashPayment(values)
            } else {
                onlinePayment(values)
            }
        }
    })


    async function onlinePayment(values) {
        const loaderId = toast.loading("Taking Order...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: "post",
                headers: {
                    token,
                },
                data: values
            }

            const { data } = await axios.request(options)
            console.log(data);

            if (data.status == "success") {
                toast.success("Redirecting to stripe....")
                setTimeout(() => {
                    location.href = data.session.url
                }, 2000)
            } else if (data.status == 404) {
                toast.error("Your cart is empty")
            }
        } catch (error) {
            toast.error("Your cart is empty")

        } finally {
            toast.dismiss(loaderId)
        }

    }




    async function cashPayment(values) {
        const loaderId = toast.loading("Taking Order...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: "POST",
                headers: {
                    token,
                },
                data: values,
            }
            let { data } = await axios.request(options);
            if (data.status == "success") {
                toast.success("Your order has been created")
                setTimeout(() => {
                    navigate("/allorders")
                }, 2000)
            } else if (data.status == 404) {
                toast.error("Your cart is empty")
            }

        } catch (error) {
            console.log(error);
            toast.error("Your cart is empty")
        } finally {
            toast.dismiss(loaderId)
        }


    }




    return (
        <>
            <Helmet>
                <title> payment page</title>
            </Helmet>
            <section>
                <h1 className="text-xl font-semibold my-5">Shipping Address</h1>
                <form action="" className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div className="city">
                        <input
                            name="shippingAddress.city"
                            onChange={formik.handleChange}
                            value={formik.values.shippingAddress.city}
                            type="text"
                            className="form-control w-full"
                            placeholder=" Type your city" />
                    </div>
                    <div className="phone">
                        <input
                            name="shippingAddress.phone"
                            onChange={formik.handleChange}
                            value={formik.values.shippingAddress.phone}
                            type="tel"
                            className="form-control w-full"
                            placeholder="Type your phone number" />
                    </div>
                    <div className="details">
                        <textarea
                            name="shippingAddress.details"
                            onChange={formik.handleChange}
                            value={formik.values.shippingAddress.details}
                            className="form-control w-full min-h-28 max-h-40"
                            placeholder="Add any details "></textarea >
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setPaymentMethod('cash')
                            }}
                            type="submit" className="btn bg-green-400 hover:bg-green-500 border-green-400 hover:border-green-400">Cash Order</button>
                        <button
                            onClick={() => {
                                setPaymentMethod("online")
                            }}
                            type="submit" className="btn ">Online Payment</button>
                    </div>
                </form>

            </section>
        </>
    )
}

