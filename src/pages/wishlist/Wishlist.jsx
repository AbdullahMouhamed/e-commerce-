import { useContext } from "react"
import { WishlistContext } from "../../context/Wishlist.Context"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import Loading from './../../components/loading/Loading';
import { CartContext } from './../../context/Cart.Context';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
    const { getWishlist, wishlistData, removeProductFromWishlist, addFromWishlistToCart } = useContext(WishlistContext)
    let { addProductToCart } = useContext(CartContext)



    useEffect(() => {
        getWishlist()
    }, [])


    return (

        <>
            <Helmet>
                <title> wishlist page</title>
            </Helmet>
            {wishlistData == null ? <Loading /> : <>  <div className="flex justify-center"><h1 className='text-center font-bold pb-2 text-blue-600 text-[22px] header-lines mb-10'>My Wishlist</h1></div>
                <div className="flex flex-col gap-4 ">
                    {wishlistData.count == 0 ? <div className="bg-blue-400 text-white flex flex-col justify-center items-center gap-6 rounded-lg py-3">
                        <p className="text-[20px]">Your Wishlist is empty !! lets fix that </p>
                        <Link to={"/"} className="btn text-white">Go back to home </Link>
                    </div> : wishlistData.data.map((e) => <div key={e._id} className="wishlist-card border-2 border-blue-300 flex justify-between items-center rounded-xl overflow-hidden">
                        <div className="flex gap-3  items-center">
                            <div className="w-[180px] h-[200px] overflow-hidden ">
                                <img className="w-[180px] h-[200px] object-cover" src={e.imageCover} alt="" />
                            </div>
                            <div className="flex flex-col gap-7  ">
                                <span>{e.title}</span>
                                <span>{e.price}L.E</span>
                                <button
                                    onClick={() => {
                                        removeProductFromWishlist({ productId: e.id })
                                    }}
                                    className="btn w-fit border-red-600 hover:border-red-700 hover:bg-red-700">Remove <i className="fa-solid fa-trash fa-fade"></i></button>
                            </div>
                        </div>
                        <div className=" pe-7">
                            <button
                                onClick={() => {
                                    addProductToCart({ productId: e.id })
                                    addFromWishlistToCart({ productId: e.id })
                                }}

                                className="btn">Add To Cart</button>
                        </div>
                    </div>)}
                </div></>}
        </>
    )
}
