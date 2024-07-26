import React from 'react'
import { AiFillFileText } from "react-icons/ai"
import { BiSolidDiscount } from "react-icons/bi"
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa"
import { IoIosPeople } from "react-icons/io"
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri"
import { Link, useLocation } from 'react-router-dom'
const data = [
    {
        "categoryTitle": "Dashboard",
        "items": [
            {
                "icon": <RiDashboardFill />,
                "title": "Dashboard",
                "link": "/admin/dashboard"
            },
            {
                "icon": <RiShoppingBag3Fill />,
                "title": "Product",
                "link": "/admin/products"
            },
            {
                "icon": <IoIosPeople />,
                "title": "Customer",
                "link": "/admin/customers"
            },
            {
                "icon": <AiFillFileText />,
                "title": "Transaction",
                "link": "/admin/transactions"
            },
            {
              "icon": <BiSolidDiscount />,
              "title": "Discount",
              "link": "/admin/discount"
            }
        ]
    },
    {
        "categoryTitle": "Charts",
        "items": [
            {
                "icon": <FaChartBar />,
                "title": "Bar",
                "link": "/admin/bar-charts"
            },
            {
                "icon": <FaChartPie />,
                "title": "Pie",
                "link": "/admin/pie-charts"
            },
            {
                "icon": <FaChartLine />,
                "title": "Line",
                "link": "/admin/line-charts"
            }
        ]
    },
    {
        "categoryTitle": "Apps",
        "items": [
            {
                "icon": <FaStopwatch />,
                "title": "Stopwatch",
                "link": "/admin/watch"
            },
            {
                "icon": <RiCoupon3Fill />,
                "title": "Coupon",
                "link": "/admin/coupon"
            },
            {
                "icon": <FaGamepad />,
                "title": "Toss",
                "link": "/admin/mini-game/toss"
            }
        ]
    }
]

const Layout = ({ children }) => {
    const location = useLocation();
    const pathname = location.pathname.split("admin/")[1];
    return (
        <div className="flex justify-between items-start ">
            <aside className=" h-screen  z-50 bg-white overflow-auto w-1/5 lg:block min-[320px]:hidden ">
               
                <div className="mt-4 px-4 mb-12">
                    {
                        data.map((data) => {
                            return (
                                <div key={data.categoryTitle}>
                                    <h3 className="mt-12 text-xl font-semibold text-blue-600">{data.categoryTitle}</h3>
                                    {data.items.map((ele) =>
                                        <div className={`mt-4 pl-4 hover:bg-blue-100 hover:text-blue-500 transition-colors ease-in-out rounded-md ${pathname.substring(0, 3) === ele.title.substring(0, 3).toLowerCase() ? "text-blue-500 bg-blue-100" : ""}`} key={ele.title}>
                                            <Link to={ele.link} className="text-lg  flex justify-start items-center gap-4 ">
                                                {ele.icon}
                                                {ele.title}
                                            </Link>
                                        </div>
                                    )}
                                </div>

                            )
                        })
                    }
                </div>
            </aside>
            <main className='min-[320px]:w-full lg:w-4/5 h-dvh overflow-auto lg:pl-12 min-[320px]:pl-0 '>{children}</main>
        </div>
    )
}

export default Layout