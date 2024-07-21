import React, { useEffect, useState } from 'react'
import { IoAddCircle } from "react-icons/io5";
import Layout from '../components/Layout';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import BasicTable from '../components/BasicTable';
import { useAllProductsQuery } from '../../redux/api/productApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { server } from '../../redux/store';

export const Columns = [
    {
        Header: "Photo",
        accessor: "photo",
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Price",
        accessor: "price",
    },
    {
        Header: "Stock",
        accessor: "stock",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];


const Products = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userReducer)
    const { data, isLoading, isError, error } = useAllProductsQuery(user?._id);
    const [rowData, setRowData] = useState([]);
    if (isError) toast.error(error.data.message);
    useEffect(() => {
        if (data) setRowData(data.products.map((i) => ({ photo: <img src={`${server}/${i.photo}`} width={96} height={96} />, name: i.name, price: i.price, stock: i.stocks, action: <Link to={`/admin/products/${i._id}`}>Manage</Link> })))
    }, [data])
    return (
        <Layout>
            <div className='md:p-4 relative grid gap-8'>
                <div>
                    <h2 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>
                        Products
                    </h2>
                    <button onClick={() => navigate(location.pathname + "/new")} className='fixed text-6xl text-blue-800 min-[320px]:top-24 md:top-14 right-8'>
                        <IoAddCircle />
                    </button>
                </div>
                <div>
                    <BasicTable dataByProp={rowData} columns={Columns} pageSize={5} fillColor={true} />
                </div>
            </div>
        </Layout>
    )
}

export default Products