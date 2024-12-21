import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);
export default function CartProvider({ children }) {
    const { token } = useContext(UserContext);
    const [cartInfo, setCartInfo] = useState(null)

    async function addProductToCart({ productId }) {

        const toastId = toast.loading("please wait while we add your product")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "post",
                headers: {
                    token,
                },
                data: {
                    productId,
                }
            }
            let { data } = await axios.request(options);

            if (data.status == "success") {
                toast.success(data.message)
                getCartProducts()
            }


        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(toastId)
        }

    }

    async function getCartProducts() {

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                }
            }
            const { data } = await axios.request(options)
            setCartInfo(data)
        } catch (error) {
            console.log(error);

        }

    }

    async function removeCartProduct({ productId }) {
        const toastIdd = toast.loading("Loading")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: 'DELETE',
                headers: {
                    token,
                }
            }
            let { data } = await axios.request(options)

            setCartInfo(data)
            toast.success("Done !")

        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(toastIdd)
        }
    }

    async function clearAll() {
        const toastIdd = toast.loading("Loading")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token,
                }
            }

            let { data } = await axios.request(options)
            if (data.message == "success") {
                setCartInfo({
                    numOfCartItems: 0
                })
            }
            toast.success("Done !")
        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(toastIdd)
        }

    }



    async function updateCount({ productId, count }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token
                },
                data: {
                    count
                }
            }
            let { data } = await axios.request(options)
            if (data.status == "success") {
                setCartInfo(data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    return <CartContext.Provider value={{ addProductToCart, getCartProducts, cartInfo, removeCartProduct, clearAll, updateCount }}>
        {children}
    </CartContext.Provider>
}