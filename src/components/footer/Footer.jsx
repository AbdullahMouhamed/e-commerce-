
import amazon from "../../assets/imgs/amazon-pay.png"
import express from "../../assets/imgs/American.png"
import masterCard from "../../assets/imgs/mastercard.webp"
import paypal from "../../assets/imgs/paypal.png"
import appStore from "../../assets/imgs/get-apple-store.png"
import googlePlay from "../../assets/imgs/get-google-play.png"
export default function Footer() {
    return (
        <>

            <footer className="bg-[#24c5df]  py-10">
                <div className="container space-y-4">
                    <header>
                        <h2 className="text-xl font-semibold">Get the Freshcart App</h2>
                        <p className="text-slate-600">we will send you a link, open it on your phone to download the app</p>
                    </header>
                    <div className="flex gap-3 flex-wrap">
                        <input className="form-control grow" type="email" placeholder="Email Address" />
                        <button className="btn bg-white hover:bg-white hover:text-black">Share App Link</button>
                    </div>

                    <div className="flex justify-between flex-wrap gap-6 items-center py-4 border-y-2 border-[#6351e6] border-opacity-20">
                        <div className="payment-partners flex  flex-wrap gap-3 items-center">
                            <h3>Payment Partners</h3>
                            <img className="w-24" src={amazon} alt="" />
                            <img className="w-24" src={express} alt="" />
                            <img className="w-20" src={masterCard} alt="" />
                            <img className="w-24" src={paypal} alt="" />
                        </div>
                        <div className="download flex flex-wrap gap-3 items-center">
                            <h3>Get deliveries with freshcart</h3>
                            <img className="w-24" src={appStore} alt="appstore pic" />
                            <img className="w-[110px]" src={googlePlay} alt="" />
                        </div>
                    </div>



                </div>
            </footer>

        </>
    )
}
