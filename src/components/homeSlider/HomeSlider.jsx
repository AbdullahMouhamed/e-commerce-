import img1 from "../../assets/imgs/slider-image-1.jpeg"
import img2 from "../../assets/imgs/slider-image-2.jpeg"
import img3 from "../../assets/imgs/slider-image-3.jpeg"
export default function HomeSlider() {
    
    return (
        <>

            <div className="grid grid-cols-12 pb-10 gap-2">
                <div className="xl:col-span-8 col-span-12 md:col-span-8 h-full ">
                    <swiper-container style={{ height: "100%" }} loop={true} >
                        <swiper-slide> <img className="w-[100%] h-full object-cover" src={img1} alt="" /></swiper-slide>
                        <swiper-slide> <img className="w-[100%] h-full object-cover" src={img2} alt="" /></swiper-slide>
                        <swiper-slide> <img className="w-[100%] h-full object-cover" src={img3} alt="" /></swiper-slide>
                    </swiper-container>
                </div>
                <div className="xl:col-span-4 col-span-12 md:col-span-4 space-y-6 h-full ">
                    <div className="">
                        <img className="w-[100%] object-contain h-full" src={img2} alt="" />
                    </div>
                    <div className="">
                        <img className="w-[100%] object-contain h-full" src={img3} alt="" />
                    </div>
                </div>

            </div>

        </>
    )
}
