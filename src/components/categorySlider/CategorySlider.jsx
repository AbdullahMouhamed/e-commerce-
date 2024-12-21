import axios from "axios";
import { useEffect, useState } from "react"
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";

export default function CategorySlider() {
    const [categories, setCategories] = useState(null);




    async function getCategories() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }
        const { data } = await axios.request(options)
        setCategories(data.data)



    }
    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>

            {categories ? <section className="pt-4 pb-16">
                <div className="flex justify-center items-center"> <h2 className=" text-center pb-2 mb-10 text-blue-600 text-[22px] font-bold header-lines">Shop Popular Categories</h2></div>
                <swiper-container loop={true} slides-per-view="6">
                    {categories.map((category) =>
                        <swiper-slide key={category._id}>
                            <Link to={`/categories`}>
                                <img key={category._id} className="w-full h-[250px] object-cover" src={category.image} alt="" />
                                <h3>{category.name}</h3>
                            </Link>
                        </swiper-slide>)}
                </swiper-container>
            </section> : <Loading />}



        </>
    )
}
