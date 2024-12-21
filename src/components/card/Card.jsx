import { useContext, useEffect } from "react"
import { CartContext } from "../../context/Cart.Context"
import { Link } from "react-router-dom"
import { WishlistContext } from "../../context/Wishlist.Context"

export default function Card({ productInfo }) {
    const { images, title, price, category, ratingsAverage, id } = productInfo
    let { addProductToWishlist } = useContext(WishlistContext)


    let { addProductToCart } = useContext(CartContext)

    useEffect(() => {

    }, [])
    return (
        <>
            <div

                className=" shadow-lg shadow-teal-200 rounded-2xl  overflow-hidden">

                <div className="relative card-hover  overflow-hidden">
                    <img className="w-[100%] h-[100%] object-cover card-img" src={images[0]} alt="" />
                    <div className="card-layer transition-all duration-[350ms] bottom-0 left-0 rounded-t-2xl absolute  bg-[#189db177] w-0 h-0 overflow-hidden justify-center items-center flex ">
                        <div className="icons flex gap-2 justify-center items-center">
                            <div
                                onClick={() => {
                                    addProductToCart({ productId: id })
                                }} className="h-7 cursor-pointer  w-7  flex hover:scale-110 hover:rotate-12 transition-transform duration-500  items-center justify-center rounded-full bg-teal-300">
                                <i className="  fa-solid fa-cart-arrow-down"></i>
                            </div>
                            <div
                                onClick={() => {
                                    addProductToWishlist({ productId: id })
                                }}
                                className="h-7  cursor-pointer w-7 flex  hover:scale-110 hover:rotate-12 transition-transform duration-500 items-center justify-center  rounded-full bg-teal-300">
                                <i className="  fa-solid fa-heart"></i>
                            </div>
                            <Link to={`/productdetails/${id}`} className="h-7  cursor-pointer w-7 flex  hover:scale-110 hover:rotate-12 transition-transform duration-500 items-center justify-center  rounded-full bg-teal-300">
                                <i className="  fa-solid fa-eye"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 p-3 flex-col flex ">
                    <h3 className="text-[#189cb1] font-bold text-center"><Link to={`/productdetails/${id}`}>{category.name}</Link></h3>
                    <h2 className="line-clamp-2 h-12"> {title}</h2>
                    <div className="flex self-end justify-between w-full ">
                        <span>{price} L.E</span>
                        <div><i className="fa-solid fa-star text-yellow-400"></i> {ratingsAverage}</div>
                    </div>
                </div>
            </div>


        </>
    )
}
