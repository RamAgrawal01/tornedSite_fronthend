import React, { useEffect } from "react";
import logo from "../../assets/Logo/torned_logo-removebg-preview.png";
import { Link, useSearchParams } from "react-router-dom";
import NavbarLinks from "../../data/navbar-links";
import { matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import MobileProfileDropDown from "../core/auth/mobileProfileDropdown";

const NavBar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const location = useLocation();

    const [subLink, setSubLink] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSubLink = async () => {
        try {
            setLoading(true);
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing results: ", result);
            setSubLink(result.data.data || []);
        } catch (err) {
            console.log("Error : ", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSubLink();
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div className="flex h-14 items-center justify-center border-b-[2px] border-b-navyblue-700">
            <div className="flex w-11/12 max-w-maxContent bg-transparent items-center justify-between">
                <Link to="/">
                    <img src={logo} width={160} height={32} alt="logo" />
                </Link>

                <nav>
                    <ul className="hidden sm:flex gap-x-6 text-navyblue-50">
                        {NavbarLinks.map((element, index) => {
                            return (
                                <li key={index}>
                                    {element.title === "Catalog" ? (
                                        <div
                                            className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                                                ? "bg-orange-400 text-black rounded-xl p-1 px-3"
                                                : "text-navyblue-50 rounded-xl p-1 px-3"
                                                }`}
                                        >
                                            <p className="flex items-center">{element.title}</p>
                                            <IoMdArrowDropdownCircle />

                                            <div className="invisible z-[100] absolute left-[50%] top-[50%] translate-x-[-43%] translate-y-[10%]
                                            flex flex-col rounded-md bg-navyblue-50 p-4 text-navyblue-900 lg:w-[200px]
                                            opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                                <div className="absolute z-[100] select-none left-[50%] translate-y-[-40%] top-[0] h-6 w-6 rotate-45 rounded
                                           bg-navyblue-50"></div>

                                                {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                ) : subLink.length ? (
                                                    <>
                                                        {subLink.map((subLink, i) => (
                                                            <Link
                                                                to={`/catalog/${subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`}
                                                                className="rounded-lg py-4 pl-4 hover:bg-navyblue-100"
                                                                key={i}
                                                            >
                                                                <p>{subLink.name}</p>
                                                            </Link>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <p className="text-center">No Courses Found</p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={element?.path}>
                                            <p className={`${matchRoute(element?.path) ? "bg-orange-400 text-black rounded-xl p-1 px-3" : "text-navyblue-50"}
                                                hover:scale-110 transition-all duration-200 hover:text-yellow-5 rounded-xl p-1 px-3`}>
                                                {element.title}
                                            </p>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Login / signup dashboard */}
                <div className="flex gap-x-4 items-center">
                    {user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                            <MdOutlineShoppingCart className="text-[2.35rem] text-navyblue-50 hover:bg-navyblue-700
                            rounded-full transition-all duration-200 p-2" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-1 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-navyblue-700 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
                    {token === null && (
                        <Link to='/login'>
                            <button className={`px-[12px] py-[8px] text-navyblue-50 rounded-xl
                                 ${matchRoute('/login') ? 'border-[2.5px] border-orange-500' : 'border border-navyblue-700 bg-navyblue-700'}
                                 hover:border-orange-500 hover:scale-95 transition-all duration-200`}
                            >
                                Login
                            </button>
                        </Link>
                    )}
                    {token === null && (
                        <Link to='/signup'>
                            <button className={`px-[12px] py-[8px] text-navyblue-50 rounded-xl
                                 ${matchRoute('/signup') ? 'border-[2.5px] border-orange-500' : 'border border-navyblue-700 bg-navyblue-800'}
                                 hover:border-orange-500 hover:scale-95 transition-all duration-200`}
                            >
                                Signup
                            </button>
                        </Link>
                    )}
                    {/* for large devices */}
                    {token !== null && <ProfileDropDown />}

                    {/* for small devices */}
                    {token !== null && <MobileProfileDropDown />}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
