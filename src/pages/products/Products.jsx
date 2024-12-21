import axios from "axios"
import { useEffect, useState } from "react"
import Card from './../../components/card/Card';
import Loading from "../../components/loading/Loading";
import { Helmet } from 'react-helmet';

export default function Products() {
    const [products, setProducts] = useState(null)


    async function getProducts() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products`,
            method: "GET"
        }

        let { data } = await axios.request(options)
        setProducts(data.data)

    }


    useEffect(() => {
        getProducts()
    }, [])





    return (
        <>
            <Helmet>
                <title> product page</title>
            </Helmet>
            <div className="flex justify-center"><h1 className='text-center font-bold pb-2 text-blue-600 text-[22px] header-lines mb-10'> Products</h1></div>

            {products ? <div className="grid mt-10 xl:grid-cols-6 md:grid-cols-2 lg:grid-cols-4 grid-cols-2 gap-5">

                {products.map((e) =>

                    <Card key={e.id} productInfo={e} />


                )}

            </div> : <Loading />}
        </>
    )
}
