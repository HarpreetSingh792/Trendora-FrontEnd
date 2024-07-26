import { onAuthStateChanged } from "firebase/auth"
import { Suspense, lazy, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import Product from "./Pages/Product"
import { Navbar } from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { auth } from "./firebase"
import { getUser } from "./redux/api/userApi"
import { userExist, userNotExist } from "./redux/reducers/userReducer"
import Loading from "./Pages/Loading"


// Admin Routes....

const Dashboard = lazy(() => import("./admin/pages/Dashboard"))
const Products = lazy(() => import("./admin/pages/Products"))
const Bar = lazy(() => import("./admin/pages/Bar"))
const Pie = lazy(() => import("./admin/pages/Pie"))
const Customer = lazy(() => import("./admin/pages/Customer"))
const Transaction = lazy(() => import("./admin/pages/Transaction"))
const Line = lazy(() => import("./admin/pages/Line"))
const NewProduct = lazy(() => import("./admin/pages/ProductNew"))
const StopWatch = lazy(() => import("./admin/pages/StopWatch"))
const Coupon = lazy(() => import("./admin/pages/Coupon"))
const Toss = lazy(() => import("./admin/pages/Toss"));
const ProductManage = lazy(() => import("./admin/pages/ManageProd"))
const TransactionManage = lazy(() => import("./admin/pages/ManageTransaction"))
const Discount = lazy(() => import("./admin/pages/Discount"))


// Main routes... 

const Home = lazy(() => import("./Pages/Home"));
const Cart = lazy(() => import("./Pages/Cart"));
const WishList = lazy(() => import("./Pages/WishList"))
const Search = lazy(() => import("./Pages/Search"))
const SignIn = lazy(() => import("./Pages/SignIn"))
const Order = lazy(() => import("./Pages/Order"))
const Shipping = lazy(() => import("./Pages/Shipping"))
const Checkout = lazy(() => import("./Pages/Checkout"))
const Error = lazy(() => import("./Pages/Error"))

const App = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user?.uid)
        dispatch(userExist(data.user))
      }
      else {
        dispatch(userNotExist());
      }
    })
  }, [])
  return loading ? <Loading /> : (
    <>
      <Navbar user={user} />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Admin Routes... */}
          <Route element={<ProtectedRoute isAuthenticated={user ? true : false} adminRoute={true} isAdmin={user?.role == 'admin' ? true : false} />} >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/new" element={<NewProduct />} />
            <Route path="/admin/bar-charts" element={<Bar />} />
            <Route path="/admin/pie-charts" element={<Pie />} />
            <Route path="/admin/customers" element={<Customer />} />
            <Route path="/admin/transactions" element={<Transaction />} />
            <Route path="/admin/discount" element={<Discount />} />
            <Route path="admin/line-charts" element={<Line />} />
            <Route path="admin/watch" element={<StopWatch />} />
            <Route path="/admin/coupon" element={<Coupon />} />
            <Route path="admin/mini-game/toss" element={<Toss />} />
            <Route path="admin/products/:id" element={<ProductManage />} />
            <Route path="/admin/transactions/:id" element={<TransactionManage />} />
          </Route>

          {/* Main Routes... */}
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Checkout />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pd/:id" element={<Product />} />
            <Route path="/sign-in" element={<ProtectedRoute isAuthenticated={user ? false : true}><SignIn /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </>
  )
}

export default App