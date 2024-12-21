import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/User.Context"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import Loading from "../../components/loading/Loading"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function AllOrders() {
    const [orders, setOrders] = useState(null)
    const { token } = useContext(UserContext)
    let { id } = jwtDecode(token)



    async function getAllOrders() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET"
            }
            const { data } = await axios.request(options)
            setOrders(data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getAllOrders()
    }, [])
    return (
        <>
            <Helmet>
                <title>All orders page</title>
            </Helmet>
            {orders ? (<section className="space-y-4">
                {orders.map((orders) => <div key={orders.id} className="order border-2 border-opacity-40 border-blue-400 p-3 rounded-lg">
                    <header className="flex items-center justify-between">

                        <div>
                            <h2> Order ID :</h2>
                            <span>{orders.id}</span>
                        </div>
                        <div className="flex gap-2">
                            {orders.isPaid ? <span className="inline-block text-white font-cairo py-1 px-4 text-[1.1rem] rounded-2xl bg-green-600 "> تم الدفع</span> : <span className="inline-block text-white font-cairo py-1 px-4 text-[1.1rem] rounded-2xl bg-red-600 "> غير مدفوع</span>}
                            {orders.isDelivered ? <span className="inline-block text-white font-cairo py-1 px-4 text-[1.1rem] rounded-2xl bg-blue-700">تم التوصيل</span> : <span className="inline-block text-white font-cairo py-1 px-4 text-[1.1rem] rounded-2xl bg-blue-400">قيد التوصيل</span>}
                        </div>
                    </header>
                    <div className="grid gap-4 mt-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-1">
                        {orders.cartItems.map((product) =>
                            <div className="border-2 space-y-2 border-blue-500 border-opacity-35 p-2 rounded-lg" key={product._id}>
                                <div>
                                    <img className="w-full" src={product.product.imageCover} alt="" />
                                </div>
                                <Link to={`/productdetails/${product.product.id}`}> <h3 className="line-clamp-1">{product.product.title}</h3></Link>
                                <div className="flex  items-center justify-between">
                                    <p>
                                        <span className="text-[1.1rem] pe-2 text-blue-500 font-semibold">Count :</span>{product.count}
                                    </p>
                                    <span> {product.price}L.E</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=" mt-4">  <p className="">Your total order price is <span className="text-blue-500">{orders.totalOrderPrice}</span> L.E</p></div>
                </div>)}
            </section>) : <Loading />}



        </>
    )
}
