import { useState } from "react";
import Card from "../../components/card/Card";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading";
import HomeSlider from "../../components/homeSlider/HomeSlider";
import CategorySlider from "../../components/categorySlider/CategorySlider";
import { Helmet } from 'react-helmet';


export default function Home() {
  const [products, setProducts] = useState(null)
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }



    const { data } = await axios.request(options)


    setProducts(data.data)


  }
  useEffect(() => {
    getProducts()
  }, [])



  return (

    <>
      <Helmet>
        <title> home page</title>
      </Helmet>
      <HomeSlider />
      <CategorySlider />
      {products ? <div className="grid xl:grid-cols-6 md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5">
        {products.map((product) => (
          <Card productInfo={product} key={product.id} />
        ))}
      </div> : (<Loading />)}



    </>
  )
}
