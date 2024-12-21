import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";
export const WishlistContext = createContext(null);
export default function WishlistProvider({ children }) {
    const { token } = useContext(UserContext);

    const [wishlistData, setWishlistData] = useState(null)



    async function addProductToWishlist({ productId }) {
        const toastId = toast.loading("please wait while we add your product to your wishlist...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId,
                }
            }
            let { data } = await axios.request(options)
            if (data.status == "success") {
                toast.success("Product added to your wishlist ❤")
                getWishlist()
            
                
            }

        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)
        }

    }

    async function getWishlist() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/wishlist",
            method: "GET",
            headers: {
                token,
            }
        }
        let { data } = await axios.request(options)
        setWishlistData(data)
    }

    async function removeProductFromWishlist({ productId }) {
        const toastId = toast.loading("Deleting...")
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            method: "DELETE",
            headers: {
                token
            }
        }
        let { data } = await axios.request(options)
        if (data.status == "success") {
            getWishlist()
            toast.success("Done!")
        }
        toast.dismiss(toastId)
    }
    async function addFromWishlistToCart({ productId }) {

        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            method: "DELETE",
            headers: {
                token
            }
        }
        let { data } = await axios.request(options)
        if (data.status == "success") {
            getWishlist()

        }

    }






    return <WishlistContext.Provider value={{ addProductToWishlist, getWishlist, wishlistData, removeProductFromWishlist, addFromWishlistToCart}}>
        {children}
    </WishlistContext.Provider >
}