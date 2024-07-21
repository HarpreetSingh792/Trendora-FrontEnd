import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import BasicTable from '../components/BasicTable'
import { useAllUsersQuery, useDeleteUserMutation } from '../../redux/api/userApi'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Loading from '../../Pages/Loading'


const Columns = [
    {
        Header: "Avatar",
        accessor: "avatar"
    },
    {
        Header: "e-mail",
        accessor: "email"
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Role",
        accessor: "role"
    },
    {
        Header: "Gender",
        accessor: "gender"
    },
    {
        Header: "Action",
        accessor: "action"
    },
]

const Customer = () => {


    const { _id } = useSelector(state => state.userReducer?.user);
    const { data, isLoading, isError, error } = useAllUsersQuery(_id)
    const [deleteUser] = useDeleteUserMutation();
    const [tableData,setTableData] = useState([]);



    const deleteUserHandler = async (id) => {
        try {
            const res = await deleteUser({ userId: id, adminId: _id });
            toast.success(res.data.message || "User deleted Successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Error deleting user");
        }

    }

    useEffect(()=>{
        if(data){
            setTableData(data?.user.map(item => (
                {
                    avatar: <img className='rounded-full w-12 h-12 m-auto' src={`${item.photo}`} alt={`${item.name}-avatar`}></img>,
                    email: item.email,
                    name: item.name,
                    role: item.role,
                    gender: item.gender,
                    action: <button onClick={() => deleteUserHandler(item._id)} className='text-red-600 underline font-semibold'>Delete</button>
                }
            )))
        }
    },[data])

   

    if (isLoading) return <Loading />

    if (isError) toast.error(error.data?.message)

    return (
        <Layout>
            <div className='md:p-4 relative grid gap-8'>
                <h2 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>Customers</h2>
                <div className='overflow'>
                    <BasicTable dataByProp={tableData} columns={Columns} pageSize={8} fillColor />
                </div>
            </div>
        </Layout>
    )
}

export default Customer