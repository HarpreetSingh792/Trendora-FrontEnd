import { signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillFileText } from "react-icons/ai";
import { BiSolidDiscount } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { CiLogin, CiLogout, CiSquarePlus } from "react-icons/ci";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaHome, FaRegUserCircle, FaStopwatch } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { SiGoogleanalytics } from "react-icons/si";
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';



export const Navbar = ({ user }) => {
  const [isLoggedIn, setLoggedIn] = useState(user);
  const [isClose, setIsClose] = useState(false)
  const [smallDeviceNavigation, setSmallDevicesNavigation] = useState(false);
  const [searchProducts, setSearchProducts] = useState("")
  const [isAdminLinkOpen, setAdminLinkOpener] = useState(false);
  const SmallDevices = window.innerWidth < 768 ? true : false;
  const navigate = useNavigate();
  const cartLength = useSelector(state => state?.cartReducer?.orderItems.map(q => q.quantity).reduce((acc, state) => acc + state, 0))
  const inputLargeRef = useRef();
  const inputSmallRef = useRef();

  const logOutHandler = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      navigate("/sign-in")
      toast.success("Logged Out Successfully !!")
      setIsClose(false)
    } catch (error) {
      toast.error("Logged Out Failed ");
    }
  }

  const isOpenDialog = () => {
    setIsClose(prev => !prev);
  }

  const clickOnDialogHandler = (route) => {
    setIsClose(false);
    navigate(route);
    setSmallDevicesNavigation(false)

  }

  const smallDevicesNavigationHandler = () => {
    setSmallDevicesNavigation(prev => !prev);
  }

  const searchOnEnterKeyHandler = (e) => {
    if (e.key == "Enter") {
      navigate("/search", { state: e.target.value })
    }
  }
  useEffect(() => {
    setLoggedIn(user)
    if (SmallDevices !== false) {
      setSmallDevicesNavigation(!SmallDevices)
    }
  }, [user, SmallDevices])

  return (
    <div className='bg-white sticky top-0 z-[99999]'>

      <div className='w-full h-12 flex justify-between items-center shadow-md gap-4'>
        <div className=' min-[320px]:w-3/4 h-full flex justify-start items-center md:w-1/5 pl-4 text-xl'>
          <button className='min-[320px]:block lg:hidden ' onClick={smallDevicesNavigationHandler}><RxHamburgerMenu /></button>
          <Link to={"/"}>

            <img className='p-2 w-24 lg:hidden min-[320px]:block' src='/logo.png' alt='logo' />
            <img className='w-48 h-12 lg:block min-[320px]:hidden' src='/large-logo.png' alt='logo' />
          </Link>
        </div>
        <div className='relative w-3/5 h-10 md:flex justify-center items-center pl-4  min-[320px]:hidden '>
          <input ref={inputLargeRef} type='text' value={searchProducts} placeholder='Search products' className='h-full w-full border-2 border-gray-500 rounded-sm pl-4 pr-8 ' onChange={(e) => setSearchProducts(e.target.value)} onKeyDown={(e) => searchOnEnterKeyHandler(e)} />
          <button className='absolute right-2' onClick={() => navigate("/search", { state: inputLargeRef.current.value })}> <IoSearch /></button>
        </div>
        <div className=' w-1/3 flex justify-evenly items-center relative gap-4 pr-2'>
          <button className='flex justify-center items-center' onClick={() => navigate("/cart")}>
            < BsCart3 />
            <span className='min-[320px]:hidden md:block relative '>
              Cart
              <span className='min-[320px]:hidden md:block p-[2px] text-xs absolute -top-2 -right-2 bg-gray-300/20 rounded-full '>{cartLength}</span>
            </span>
            <span className='min-[320px]:block md:hidden p-[2px] text-xs absolute -top-1 right-[70%] bg-gray-300/20 rounded-full '>{cartLength}</span>
          </button>

          <dialog open={!isClose} className='absolute top-10 min-[100px]:open:hidden lg:block lg:-left-4 z-[999] w-52 open:grid place-items-center p-2 drop-shadow-xl rounded-md' >
            <button className=' mt-3 w-full flex justify-center items-center rounded-md hover:bg-blue-200/10' onClick={() => clickOnDialogHandler("/")}>
              <span className="flex justify-start items-center gap-2 w-1/2 ">
                <FaHome />
                Home
              </span>
            </button>
            {isLoggedIn?.role === "admin" && <button className='mt-3 w-full flex justify-center items-center  gap-2  rounded-md hover:bg-blue-200/10' onClick={() => clickOnDialogHandler("/admin/dashboard")}>
              <span className="flex justify-start items-center gap-2 w-1/2 ">
                <SiGoogleanalytics />
                Analytics
              </span>
            </button>}
            {isLoggedIn && <button className='mt-3 w-full flex justify-center items-center gap-2 rounded-md hover:bg-blue-200/10' onClick={() => clickOnDialogHandler("/orders")}>
              <span className="flex justify-start items-center gap-2 w-1/2 ">
                <GrDeliver />
                Orders
              </span>
            </button>}
            {!isLoggedIn ? <button className='mt-3 w-full  flex justify-center items-center gap-2 rounded-md hover:bg-blue-200/10' onClick={() => clickOnDialogHandler("/sign-in")} >
              <span className="flex justify-start items-center gap-2 w-1/2 ">
                <CiLogin />
                Login
              </span>
            </button> : <button className='mt-3 w-full flex justify-center items-center rounded-md hover:bg-blue-200/10' onClick={logOutHandler} >
              <span className="flex justify-start items-center gap-2 w-1/2 ">
                <CiLogout />
                Logout
              </span>
            </button>}

          </dialog>

          <button className='md:flex justify-start items-center min-[320px]:hidden ' onClick={() => navigate("/wishlist")}>
            <CiSquarePlus />
            <span className='min-[320px]:hidden md:block relative '>
              Wishlist
            </span>
          </button>

          {isLoggedIn && (<button><img src={isLoggedIn?.photo} alt="user-pic" className='rounded-full w-9' onClick={isOpenDialog} /></button>)}
          {!isLoggedIn && (<button className='rounded-full w-9 text-3xl' onClick={isOpenDialog}><FaRegUserCircle /></button>)}
        </div>
      </div>
      <div className='px-1 relative flex justify-center items-center min-[320px]:block md:hidden'>
        <input ref={inputSmallRef} type='text' value={searchProducts} placeholder='Search products' className='h-10 border-2 border-gray-500 rounded-lg w-full px-4' onChange={(e) => setSearchProducts(e.target.value)} onKeyDown={(e) => searchOnEnterKeyHandler(e)} />
        <button className='absolute px-2 right-2 text-xl border-l-2 border-gray-500 h-full' onClick={() => navigate("/search", { state: inputSmallRef.current.value })}><IoSearch /></button>
      </div>

      {/* Small Devices Navigation.... */}
      {smallDeviceNavigation && <div className='fixed top-1 left-0 bg-white/80 backdrop-blur-md h-full w-11/12 z-[999] flex flex-col gap-4'>
        <div className='relative mb-4'>
          <button className='text-2xl absolute right-2 ' onClick={smallDevicesNavigationHandler}>
            <RxCross2 />
          </button>
        </div>

        <button className='h-8 w-full flex justify-center items-center gap-2 pl-4 rounded-md hover:bg-blue-200/10 ' onClick={() => clickOnDialogHandler("/")}>
          <span className="flex justify-start items-center gap-2 w-1/2 min-[320px]:text-lg md:text-xl ">
            <FaHome />
            Home
          </span>
        </button>
        {isLoggedIn?.role === "admin" && <button className='h-8 w-full flex justify-center items-center  gap-2 pl-4 rounded-md hover:bg-blue-200/10' onClick={() => setAdminLinkOpener(prev => !prev)}>
          <span className="flex justify-start items-center gap-2 w-1/2 min-[320px]:text-lg md:text-xl ">
            <SiGoogleanalytics />
            Analytics
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          </span>
        </button>}

        {isLoggedIn?.role === "admin" && isAdminLinkOpen &&
          <div className="overflow-y-auto grid gap-1 transition-all animate-ease-forward ">
            {
              AdminLinks.map((data) => {
                return (
                  <div key={data.categoryTitle}>
                    <h3 className="ml-24  sm:ml-48 min-[320px]:text-md md:text-lg font-semibold text-blue-600 border-b-2">{data.categoryTitle}</h3>
                    {data.items.map((ele) =>
                      <div className={`mt-1 pl-28 sm:pl-52  transition-colors ease-in-out rounded-md`} key={ele.title}>
                        <NavLink to={ele.link} className={({ isActive }) => `min-[320px]:text-md md:text-lg flex justify-start items-center gap-4 ${isActive ? "text-blue-500 bg-blue-100" : ""}`} onClick={() => setSmallDevicesNavigation(false)}>
                          {ele.icon}
                          {ele.title}
                        </NavLink>
                      </div>
                    )}
                  </div>

                )
              })
            }
          </div>
        }

        {isLoggedIn && <button className='h-8 w-full flex justify-center items-center gap-2 pl-4 rounded-md hover:bg-blue-200/10' onClick={() => clickOnDialogHandler("/orders")}>
          <span className="flex justify-start items-center gap-2 w-1/2 min-[320px]:text-lg md:text-xl ">
            <GrDeliver />
            Orders
          </span>
        </button>}

        <button className='h-8 w-full flex justify-center items-center gap-2 pl-4 rounded-md hover:bg-blue-200/10' onClick={() => clickOnDialogHandler("/wishlist")}>
          <span className="flex justify-start items-center gap-2 w-1/2 min-[320px]:text-lg md:text-xl ">
            <CiSquarePlus />
            WishList
          </span>
        </button>

        {!isLoggedIn ? <button className='h-8 w-full  flex justify-center items-start gap-2 pl-4 rounded-md hover:bg-blue-200/10' onClick={() => clickOnDialogHandler("/sign-in")} >
          <span className="flex justify-start items-center gap-2 w-1/2 min-[320px]:text-lg md:text-xl" >
            <CiLogin />
            Login
          </span>
        </button> : <button className='h-8 w-full flex justify-center items-center gap-2 pl-4 rounded-md hover:bg-blue-200/10' onClick={logOutHandler} >
          <span className="flex justify-start items-center gap-2 w-1/2 min-[320px]:text-lg md:text-xl " >
            <CiLogout />
            Logout
          </span>
        </button>}


      </div>}
    </div>
  )
}


export const AdminLinks = [
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