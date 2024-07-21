import React, { useEffect, useState } from 'react'
import "../../styles/main1.scss"
import { BiMaleFemale } from "react-icons/bi";
import { BarChart, DoughnutChart } from '../components/Charts';
import Layout from '../components/Layout';
import BasicTable from '../components/BasicTable';
import { Columns } from '../assets/dummyData';
import Loading from "../../Pages/Loading";
import { useHomeStatsQuery } from '../../redux/api/dashboardApi';
import { useSelector } from 'react-redux';
import Cards from '../components/Cards';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [size, setSize] = useState(window.innerWidth);
    const colorsData = ["#DC143C", "#FFFF00", "#0000FF", "#FF4500", "#FA8072", "#90EE90"];

    const { user } = useSelector((state) => state.userReducer);

    const { isLoading, data: statsData } = useHomeStatsQuery(user?._id);

    window.addEventListener("resize", () => {
        setSize(window.innerWidth);
    })



    const tableData = statsData?.stats?.latestTransaction.map(item => (
        {
            id: item._id,
            quantity: item.quantity,
            discount: item.discount,
            amount: item.amount,
            status: <p className={`${item.status === 'Processing' ? "text-red-500" : item.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>{item.status}</p>,
            action: <Link to={`/admin/transactions/${item._id}`}>Manage</Link>
        }
    ))



    useEffect(() => {
        window.addEventListener("resize", () => {
            setSize(window.innerWidth);
        })
    }, [size])

    function getCutSize() {
        return () => {
            if (size <= 350) return 60;
            if (size > 356 && size <= 899) return 140;
            if (size > 756 && size <= 1020) return 180;
            if (size > 900) return 90;
        }
    }

    return isLoading ? <Loading /> : (
        <Layout>

            <div className="flex min-[320px]:justify-center lg:justify-start items-center gap-4 flex-wrap p-4">

                <Cards name={"Revenue"} value={parseInt(statsData?.stats?.count?.revenue)} percentage={statsData?.stats?.changePercent?.revenue} color={"blue"} />
                <Cards name={"Users"} value={statsData?.stats?.count?.userCount} percentage={statsData?.stats?.changePercent?.user} color={"orangered"} />
                <Cards name={"Transactions"} value={statsData?.stats?.count?.order} percentage={statsData?.stats?.changePercent?.order} color={"lightblue"} />
                <Cards name={"Products"} value={statsData?.stats?.count?.product} percentage={statsData?.stats?.changePercent?.product} color={"orange"} />
            </div>
            <div className="grid place-items-center p-4 gap-4 md:flex md:justify-between md:items-start mt-4 min-[320px]:h-full md:h-96 ">
                <div className='min-[320px]:w-4/5 md:w-3/5 shadow-4xl rounded-md p-4 h-full grid place-content-evenly  '>
                    <h2 className='text-xl text-center font-[200] uppercase mb-5 tracking-wider '>Revenue & Transaction</h2>
                    <BarChart data1={statsData?.stats?.chart?.revenue} data2={statsData?.stats?.chart?.order} title1={"Revenue"} title2={"Transaction"} color1={"rgb(0, 115, 255)"} color2={"rgba(53, 162, 235, 0.8)"} viewWidth={size} />
                </div>
                <div className='w-4/5 md:w-1/3 rounded-md shadow-4xl h-full p-4 min-[320px]:mr-0 md:mr-4 grid place-content-center'>
                    <h2 className='text-xl text-center font-[200] uppercase mb-5 tracking-wider'>Inventory</h2>
                    <div className='flex flex-col items-start justify-between gap-8  mr-4 w-full overflow-y-auto cursor-pointer'>
                        {
                            statsData?.stats?.categoryCount.map((item, idx) => (<div key={Object.keys(item)} className={`bg-white flex justify-evenly items-center font-light text-md capitalize mb-4`} style={{ "--color": colorsData[idx % colorsData.length], "--height": "10px" }}>

                                <label className='flex justify-start w-20'>{Object.keys(item)}</label>
                                <progress value={Object.values(item)} max={100} className="w-32"></progress>
                                <p>{Object.values(item) + "%"}</p>
                            </div>))
                        }
                    </div>
                </div>
            </div>


            <div className="grid place-items-center p-4 gap-4  md:flex md:justify-between md:items-start md:mt-4 min-[320px]:h-full md:h-96 ">

                <div className="min-[320px]:w-4/5 md:w-1/3 shadow-4xl rounded-md p-4 md:h-full min-w-[17.5rem] grid place-content-center relative">
                    <h2 className='text-xl text-center font-[200] uppercase mb-5 tracking-wider'>Gender Ratio</h2>
                    <DoughnutChart title={["Female", "Male"]} dataArray={[statsData?.stats?.userRatio?.female, statsData?.stats?.userRatio?.male]} color={["rgb(210, 12, 109)", "skyblue"]} cutout={
                        getCutSize()
                    } />
                    <span className='absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2 text-4xl '>
                        <BiMaleFemale />
                    </span>
                </div>
                <div className='w-4/5 shadow-4xl rounded-md p-4 md:h-full min-w-[17.5rem] overflow-auto min-h-80'>
                    <h2 className='text-xl text-center font-[200] uppercase mb-5 tracking-wider' >TOP TRANSACTION</h2>
                    <BasicTable dataByProp={tableData} columns={Columns} fillColor />
                </div>
            </div>
        </Layout>

    )
}
export default Dashboard