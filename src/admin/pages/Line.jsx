import React from 'react'
import Layout from '../components/Layout'
import { LineChart } from '../components/Charts'
import { useLineStatsQuery } from '../../redux/api/dashboardApi';
import { useSelector } from 'react-redux';
import Loading from '../../Pages/Loading';

const Line = () => {
  const { user } = useSelector((state) => state.userReducer);

  const {isLoading,data} =useLineStatsQuery(user?._id);
  return isLoading?<Loading />:(
    <Layout>
      <div className="p-4 grid min-[320px]:gap-4 md:gap-20">
        <h2 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>Line Charts</h2>
        <div className="legend h-96">
          <LineChart data1={data?.charts?.users} backgroundColor={"skyblue"} borderColor={"rgba(10,100,255,0.7)"} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>ACTIVE USERS</h3>
        </div>
        <div className="legend h-96">
          <LineChart data1={data?.charts?.products} backgroundColor={"#DDA0DD"} borderColor={"#800080"} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>TOTAL PRODUCTS (SKU)</h3>
        </div>
        <div className="legend h-96">
          <LineChart data1={data?.charts?.revenue} backgroundColor={"lightgreen"} borderColor={"seagreen"} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>TOTAL REVENUE</h3>
        </div>
        <div className="legend h-96">
          <LineChart data1={data?.charts?.discount} backgroundColor={"#fd5c63"} borderColor={"#AA0000"} />
          <h3 className='text-center min-[320px]:tracking-wide md:tracking-wider font-thin min-[320px]:text-lg md:text-2xl'>DISCOUNT ALLOTTED</h3>
        </div>
      </div>
    </Layout>
  )
}

export default Line