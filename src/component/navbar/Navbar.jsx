import React from "react";
import { FiMenu } from "react-icons/fi";
import Cookies from 'js-cookie';

const Navbar = () => {
    const token = Cookies.get('token')
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                            <a>Jadwal januari 2024</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden md:flex">
                    {
                        token ?
                        <a className="btn btn-ghost">Jadwal Januari 2024</a>
                        :
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <details>
                                    <summary>Jadwal Januari 2024</summary>
                                    <ul className="p-2">
                                        <li><a>Jadwal Februari 2024</a></li>
                                        <li><a>Jadwal Maret 2024</a></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    }
                </div>
                <div className="navbar-end">
                    {
                        token ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                        :
                        <button className="btn btn-primary" onClick={()=>document.getElementById('login_modal').showModal()}>Login</button>
                    }
                </div>
            </div>
            
        </>
    )
}

export default Navbar;