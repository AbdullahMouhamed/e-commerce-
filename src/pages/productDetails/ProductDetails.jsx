import { useContext, useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.Context";
import ReactImageGallery from "react-image-gallery";
import { Helmet } from 'react-helmet';
import Card from './../../components/card/Card';

export default function ProductDetails() {
    let { id } = useParams()
    const [productDetails, setProductDetails] = useState(null)
    const { addProductToCart } = useContext(CartContext)
    const [relatedProducts, setRelatedProducts] = useState(null)




    async function getDetails() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method: "GET",
            }
            const { data } = await axios.request(options)
            setProductDetails(data.data)
        } catch (error) {
            console.log(error);

        }
    }



    async function getRelatedProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method: 'GET'
            }
            let { data } = await axios.request(options)

            setRelatedProducts(data.data)
        } catch (error) {
            console.log(error);

        }

    }




    useEffect(() => {
        getDetails()

    }, [id])

    useEffect(() => {
        if (productDetails == null) return;

        getRelatedProducts()

    }, [productDetails])

    return (
        <>
            <Helmet>
                <title> product details page</title>
            </Helmet>
            {productDetails ?
                <>

                    <section className="grid grid-cols-4 gap-8 ">
                        <div className=" border-2 col-span-4 md:col-span-1 border-blue-400 overflow-hidden rounded-lg border-opacity-50">
                            <ReactImageGallery showFullscreenButton={false} autoPlay={true} showPlayButton={false} showNav={false} items={productDetails.images.map((image) => {
                                return {
                                    original: image,
                                    thumbnail: image,
                                }
                            })}>

                            </ReactImageGallery>
                        </div>
                        <div className=" flex col-span-4 md:col-span-3 flex-col space-y-5">

                            <div>
                                <h2 className="text-[25px] font-bold">{productDetails.title}</h2>
                                <h3 className="text-blue-400 font-bold">{productDetails.category.name}</h3>
                            </div>
                            <p className="text-slate-500">{productDetails.description}</p>

                            <div className="flex justify-between">
                                <span>{productDetails.price} L.E</span>

                                <div className="flex justify-center items-center gap-2">
                                    <i className="fa-solid fa-star text-yellow-400 fa-bounce"></i>
                                    <span>{productDetails.ratingsAverage}</span>
                                </div>
                            </div>
                            <button onClick={() => {
                                addProductToCart({ productId: id })
                            }} className="btn">ADD TO CART</button>
                        </div>
                    </section>

                    <section className="mt-8"> <h2 className="text-[25px] mb-8 font-bold">Related Products</h2>
                        {relatedProducts ? <>
                            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 ">
                                {relatedProducts.map((e) =>
                                    <Card productInfo={e} key={e._id} />
                                )}
                            </div>
                        </> : <Loading />}

                    </section>
                </>

                : <Loading />}

        </>
    )
}
