
import { Link, NavLink } from "react-router-dom"
import freshLogo from "../../assets/imgs/freshcart-logo.svg"
import { useContext, useEffect, useState } from "react"
import { UserContext } from '../../context/User.Context';
import { CartContext } from "../../context/Cart.Context";
import { useRef } from "react";

export default function Navbar() {
    let { token, logOut } = useContext(UserContext)
    const { cartInfo, getCartProducts } = useContext(CartContext)
    let [mediaDisplay, setMediaDisplay] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const mediaRef = useRef()
    const settingsRef = useRef()
    useEffect(() => {
        return function () {
            window.onclick = undefined
        }
    }, [])


    function dropSettings() {
        if (!settingsOpen) {
            settingsRef.current.classList.remove("hidden")
            settingsRef.current.classList.add("flex")
            setSettingsOpen(true)
            window.onclick = function (e) {

                if (!e.target.classList.contains("settings")) {
                    settingsRef.current.classList.add("hidden")
                    settingsRef.current.classList.remove("flex")
                    setSettingsOpen(false)

                }
            }
        } else {
            settingsRef.current.classList.add("hidden")
            settingsRef.current.classList.remove("flex")

            setSettingsOpen(false)
        }
    }

    function dropMenu() {
        if (!menuOpen) {
            document.querySelector(".menuList").classList.remove("hidden")
            document.querySelector(".menuList").classList.add("flex")

            setMenuOpen(true)
        } else {
            document.querySelector(".menuList").classList.add("hidden")
            document.querySelector(".menuList").classList.remove("flex")

            setMenuOpen(false)
        }
    }

    function displayMedia() {
        if (!mediaDisplay) {
            document.querySelector(".media").classList.remove("h-0")
            document.querySelector(".media").classList.add("h-[60px]")
            setMediaDisplay(true)


            window.onclick = function (e) {

                if (!e.target.classList.contains("mediaRef")) {
                    document.querySelector(".media").classList.add("h-0")
                    document.querySelector(".media").classList.remove("h-[60px]")
                    setMediaDisplay(false)

                }
            }




        } else {

            document.querySelector(".media").classList.add("h-0")
            document.querySelector(".media").classList.remove("h-[60px]")
            setMediaDisplay(false)
        }
    }







    useEffect(() => {
        getCartProducts()
    }, [])

    return (
        <>
            <nav className="bg-[#24c5df] shadow-md px-2 fixed z-50 w-full">
                <div className="container flex    gap-10 py-4  ">
                    <div className="flex md:flex-row flex-col gap-4 items-center lg:gap-20 ">
                        <Link to="/">
                            <img src={freshLogo} alt="" />
                        </Link>
                        {token &&
                            <>

                                <ul className="hidden flex-col md:flex-row menuList md:flex ms-auto justify-center items-center gap-5">
                                    <li>
                                        <NavLink className={({ isActive }) => {
                                            return ` relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                        }} to="/">
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => {
                                            return ` relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                        }} to="/products">
                                            Products
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => {
                                            return ` relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                        }} to="/categories">
                                            Categories
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => {
                                            return ` relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                        }} to="/brands">
                                            Brands
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => {
                                            return ` relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                        }} to="/allorders">
                                            Orders
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => {
                                            return ` relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                        }} to="/wishlist">
                                            Wishlist
                                        </NavLink>
                                    </li>
                                </ul>

                            </>}
                    </div>
                    {token && <i onClick={dropMenu} className=" text-[1.3rem] pt-2 fa-solid cursor-pointer md:hidden fa-bars"></i>}
                    {token && <Link to="/cart" className="ml-auto pt-2 ">
                        <div className="my-cart  relative  cursor-pointer"><i className=" text-[1.3rem] fa-solid fa-cart-shopping "></i>
                            <div className="cart-counter flex justify-center items-center  w-5 h-5 rounded-full bg-[#7a8eec] absolute top-1 right-0 translate-x-1/2 -translate-y-1/2">
                                {cartInfo == null ? <li className="fa-solid fa-spinner fa-spin"></li> : <span className="text-[12px]">{cartInfo.numOfCartItems}</span>}
                            </div>
                        </div>
                    </Link>}

                    {token ? <div

                        onClick={displayMedia}
                        ref={mediaRef}
                        className="relative ms-auto mediaRef pt-1 ">
                        <i className="fa-solid mediaRef fa-star fa-bounce  h-7 w-7 rounded-full bg-[#239b7b] cursor-pointer text-sm hover:scale-110 transition-all duration-300 text-white flex justify-center items-center "> </i>
                        <ul className={`mediaRef  ${!token && "ms-auto"}`}>
                            <div className=" media mediaRef flex justify-center items-center absolute bg-teal-500 text-white w-fit -right-14 mt-3 transition-[height] duration-300  h-0 overflow-hidden rounded-md gap-6">
                                <li>
                                    <a href="">
                                        <i className="fa-brands fa-instagram text-[18px] hover:scale-150 hover:text-blue-700 transition-all px-2   py-5  hover:rotate-12 duration-300  "></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa-brands fa-facebook text-[18px] hover:scale-150 hover:text-blue-700 transition-all px-1 py-5  hover:rotate-12 duration-300  "></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa-brands fa-twitter text-[18px] hover:scale-150 hover:text-blue-700 transition-all px-1  py-5 hover:rotate-12 duration-300  "></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa-brands fa-linkedin text-[18px] hover:scale-150 hover:text-blue-700 transition-all px-1  py-5 hover:rotate-12 duration-300  "></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/">
                                        <i className="fa-brands fa-youtube text-[18px] hover:scale-150 hover:text-blue-700 transition-all  px-3 py-5 hover:rotate-12 duration-300  "></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fa-brands fa-tiktok text-[18px] hover:scale-150 hover:text-blue-700 transition-all px-2  py-5  hover:rotate-12 duration-300  "></i>
                                    </a>
                                </li>
                            </div>

                        </ul>


                    </div> : null}


                    {!token && <>

                        <ul className="flex justify-center relative ms-auto pt-2 items-center gap-5">
                            <li>
                                <NavLink className={({ isActive }) => {
                                    return ` relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                }} to="/signup">Sign up</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => {
                                    return ` relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                }} to="/login">Login</NavLink>
                            </li>
                            <div

                                onClick={dropSettings}
                                className=" rounded-full settings w-8 h-8 flex justify-center items-center cursor-pointer bg-yellow-50">
                                <i className="fa-solid fa-gear fa-spin settings "></i>
                            </div>
                            <div
                                ref={settingsRef}
                                className="flex-col hidden justify-center items-center w-[200px] h-full top-[110%] py-6 rounded-lg overflow-hidden right-0 bg-blue-300 absolute">
                                <NavLink className={({ isActive }) => {
                                    return ` settings relative before:absolute before:w-0 before:h-0.5 before:bg-[#6351e6] before:left-0 hover:before:w-full before:transition-[width] before:duration-500  before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                                }} to="/forgotpassword">Forgot your password?</NavLink>
                            </div>
                        </ul>

                    </>}






                    {token && <>
                        <div className="flex gap-6  justify-center items-center text-sm">
                            <a onClick={logOut}>
                                <i className="fa-solid pt-2 fa-right-from-bracket cursor-pointer text-[20px]"></i>
                            </a>

                        </div>
                    </>}


                </div>


            </nav >
        </>
    )
}
