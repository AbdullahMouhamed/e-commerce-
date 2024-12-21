import { useContext } from "react"
import { CartContext } from "../../context/Cart.Context"
import { Link } from 'react-router-dom';

export default function CartItem({ productInfo }) {
    let { count, price, product } = productInfo
    let { title, imageCover, category, id } = product


    let { removeCartProduct, updateCount } = useContext(CartContext)


    return (
        <>
            <div className="flex items-center gap-2 ">
                <div className="card-item px-7 flex grow bg-blue-200 rounded-2xl justify-between items-center p-3">

                    <img className="w-24 h-24 rounded-full object-cover border border-white" src={imageCover} alt="" />
                    <h3 className=" w-[195px] "><Link to={`/productdetails/${id}`} >{title}</Link></h3>
                    <h4>{category.name}</h4>
                    <div className="flex gap-5 justify-center items-center">
                        <span className="text-[20px]">{count}</span>
                        <div className="icons space-y-5">
                            <div onClick={() => {
                                updateCount({ productId: id, count: count + 1 })
                            }} className="plus">
                                <i className="fa-solid fa-plus cursor-pointer h-6 flex justify-center items-center w-6 bg-slate-400 rounded-full"></i>
                            </div>
                            <div
                                onClick={() => {
                                    updateCount({ productId: id, count: count - 1 })
                                }}
                                className="minus">
                                <i className="fa-solid fa-minus cursor-pointer h-6 flex justify-center items-center w-6 bg-slate-400 rounded-full"></i>
                            </div>
                        </div>
                    </div>
                    <span>{price} L.E</span>

                </div>
                <button
                    onClick={() => {

                        removeCartProduct({ productId: id })
                    }}

                    className=" rounded-md px-3 py-5 bg-red-500  hover:bg-red-600 hover:text-white transition-colors duration-300"><i className="fa-solid fa-xmark "></i> </button>
            </div>
        </>
    )
}
