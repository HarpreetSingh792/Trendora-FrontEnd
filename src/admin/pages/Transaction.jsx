import React from 'react'
import Layout from '../components/Layout'
import BasicTable from '../components/BasicTable'
import { Columns } from '../assets/dummyData'
import { useGetAllOrdersQuery } from '../../redux/api/orderApi'
import { useSelector } from 'react-redux'
import toast from "react-hot-toast"
import { Link } from 'react-router-dom'
const Transaction = () => {

    const { _id } = useSelector(state => state.userReducer?.user);

    const { data, isLoading, isError, error } = useGetAllOrdersQuery(_id)
    const tableData = data?.orders.map(item => (
        {
            id: item._id,
            quantity: item.orderItems.map(item => item.quantity).reduce((acc, state) => acc + state, 0),
            discount: item.discount,
            amount: item.total,
            status: <p className= {`${item.status==='Processing'?"text-red-500":item.status==="Delivered"?"text-green-500":"text-yellow-500"}`}>{item.status}</p>,
            action: <Link to={`/admin/transactions/${item._id}`}>Manage</Link>
        }
    ))

    if (isError) toast.error(error.data?.message)
    return (
        <Layout>
            <div className='md:p-4 relative grid gap-8' >

                <h2 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>
                    Transaction
                </h2>
                {
                    !isLoading&&
                    <div className='overflow-auto'>
                        <BasicTable dataByProp={tableData} columns={Columns} pageSize={8} fillColor />
                    </div>
                }
            </div>

        </Layout>
    )
}

export default Transaction