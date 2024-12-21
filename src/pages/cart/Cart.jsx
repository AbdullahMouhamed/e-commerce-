import { useContext, useEffect } from "react"
import { CartContext } from "../../context/Cart.Context"
import Loading from "../../components/loading/Loading"
import CartItem from "../../components/cartitem/CartItem"
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {


    const { getCartProducts, cartInfo, clearAll } = useContext(CartContext)

    useEffect(() => {
        getCartProducts()
    }, [])



    return (
        <>
            <Helmet>
                <title> cart page</title>
            </Helmet>
            {cartInfo == null ? <Loading /> : <section>
                <div className="flex gap-2  items-center text-[25px] py-4">
                    <i className="fa-brands fa-opencart"></i>
                    <div>|</div>
                    <h2>Your Shoping Cart</h2>
                </div>

                {cartInfo.numOfCartItems == 0 ? <div className="flex flex-col gap-3 p-3 rounded-lg justify-center items-center bg-blue-400 ">

                    <h2 className="text-[25px] text-slate-800">your cart is empty you can start shoping now !</h2>
                    <Link to="/" className="btn">Back To Home</Link>
                </div> : <>
                    <div className="space-y-4 mt-6">
                        {cartInfo.data.products.map((product) => <CartItem productInfo={product} key={product._id} />)}

                    </div>
                    <div className=" flex justify-between pt-5">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-dollar-sign"></i>
                            <p> your total price </p>
                            <span className="text-blue-700 font-bold text-[20px]">{cartInfo.data.totalCartPrice} <span className="text-black">L.E</span></span>
                        </div>
                        <button onClick={clearAll} className="p-3 bg-red-600 rounded-lg text-white hover:bg-red-800 transition-colors duration-300">Clear Cart</button>
                    </div>
                    <Link className="btn inline-block w-full text-center mt-9" to="/choosepayment">Next Step (payment)</Link>
                </>}
            </section>}

        </>
    )
}
