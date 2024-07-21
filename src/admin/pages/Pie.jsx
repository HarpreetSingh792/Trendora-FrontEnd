import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { DoughnutChart, PieChart } from '../components/Charts'
import { useSelector } from 'react-redux';
import { usePieStatsQuery } from '../../redux/api/dashboardApi';
import Loading from '../../Pages/Loading';

const Pie = () => {
  const [size, setSize] = useState(window.innerWidth <= 976);

  const { user } = useSelector((state) => state.userReducer);

  const { isLoading, data } = usePieStatsQuery(user?._id);
  // console.log(Object.keys()
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth <= 976)
    })
    return window.removeEventListener("resize", () => {
      setSize(window.innerWidth <= 976)
    })
  }, [])
  return isLoading ? <Loading /> : (
    <Layout>
      <div className="p-4">
        <h2 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>Pie & Doughnut Charts</h2>
        <div className="legend h-96">
          <PieChart label={["Processing", "Shipped", "Delivered"]} data={Object.values(data?.charts?.orderFullfillment)} color={["rgb(0, 115, 255)", "red", "pink"]} offset={[70, 10, 10]} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>ORDER FULFILLMENT RATIO</h3>
        </div>
        <div className="legend h-96">
          <DoughnutChart title={data?.charts?.productCategories.map((ele) => Object.keys(ele))} dataArray={data?.charts?.productCategories.map((ele) => Object.values(ele))} color={["blue", "seagreen", "darkgoldenrod", "purple"]} cutout={size ? 40 : 55} legendDisplay={false} offset={[10, 10, 10, 85]} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>PRODUCT CATEGORIES RATIO</h3>
        </div>
        <div className="legend h-96">
          <DoughnutChart title={Object.keys(data?.charts?.stockAvailablity)} dataArray={Object.values(data?.charts?.stockAvailablity)} color={["seagreen", "crimson"]} cutout={size ? 40 : 55} legendDisplay={false} offset={[10, 75]} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>STOCK AVAILABLITY</h3>
        </div>
        <div className="legend h-96">
          <DoughnutChart title={Object.keys(data?.charts?.revenueDistribution)} dataArray={Object.values(data?.charts?.revenueDistribution)} color={["seagreen", "crimson", "darkgoldenrod", "purple", "orangered"]} cutout={size ? 40 : 55} legendDisplay={false} offset={[20, 30, 10, 10, 75]} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>REVENUE DISTRIBUTION</h3>
        </div>
        <div className="legend h-96">
          <DoughnutChart title={Object.keys(data?.charts?.usersAgeGroup)} dataArray={Object.values(data?.charts?.usersAgeGroup)} color={["salmon", "crimson", "darkgoldenrod", "purple"]} cutout={size ? 40 : 55} legendDisplay={false} offset={[10, 10, 85]} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>USER AGE GROUP RATIO</h3>
        </div>
        <div className="legend h-96">
          <DoughnutChart title={Object.keys(data?.charts?.adminCustomer)} dataArray={Object.values(data?.charts?.adminCustomer)} color={["blue", "seagreen", "darkgoldenrod", "purple"]} cutout={size ? 40 : 55} legendDisplay={false} offset={[10, 85]} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>ADMIN USER RATIO</h3>
        </div>
      </div>
    </Layout>
  )
}

export default Pie