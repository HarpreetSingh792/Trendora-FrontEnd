import React, { useEffect, useState } from 'react'
import { BarChart } from '../components/Charts'
import Loading from "../../Pages/Loading";
import Layout from '../components/Layout'
import { useSelector } from 'react-redux';
import { useBarStatsQuery } from '../../redux/api/dashboardApi';

const Bar = () => {


  const [size, setSize] = useState(window.innerWidth);
  ;
  window.addEventListener("resize", () => {
    setSize(window.innerWidth);
  })
  const { user } = useSelector((state) => state.userReducer);

  const {isLoading,data} = useBarStatsQuery(user?._id)

  console.log(data?.charts)
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth);
    })
  }, [size])
  return isLoading?<Loading />:(
    <Layout>
      <div className="p-4 grid gap-8">
        <h2 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>Bar Charts</h2>
        <div className="w-11/12 mt-4 grid gap-4 ">
          <BarChart data1={data?.charts?.products} data2={data?.charts?.users} title1={"Revenue"} title2={"Transaction"} color1={"purple"} color2={"pink"} viewWidth={size} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>TOP SELLING PRODUCTS & TOP CUSTOMERS</h3>
        </div>
        <div className="w-11/12 mt-4 grid gap-4">
          <BarChart data1={data?.charts?.orders} title1={"Revenue"} color1={"rgb(0, 115, 255)"} axis={false} viewWidth={size} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>ORDERS THROUGHOUT THE YEAR</h3>
        </div>
      </div>
    </Layout>
  )
}

export default Bar