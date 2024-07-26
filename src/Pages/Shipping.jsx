import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { countries } from '../../public/data';
import { addShippingInfo } from "../redux/reducers/cartReducer"
import axios from 'axios';
import { server } from '../redux/store';
import toast from 'react-hot-toast';

const Shipping = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderItems, total } = useSelector(state => state?.cartReducer)
    const {_id} = useSelector(state=>state.userReducer.user??"")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [pincode, setPincode] = useState("")

    useEffect(() => {
        if (!orderItems.length > 0) return navigate("/cart")
    }, [])


    const onChangeHandler = (e, setCurrentState) => {
        setCurrentState(e.target.value);
    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault();

            if(!_id) {
                toast.error("Login First");
                navigate("/sign-in")
                return
            }
            dispatch(addShippingInfo({
                address,
                city,
                state,
                country,
                pincode: parseInt(pincode)
            }))

            const { data } = await axios.post(`${server}/api/v1/order/create-payment/`, {
                "amount": parseInt(total)
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            )

            navigate("/payment",{state:data.clientSecret})
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

    }

    return (
        <form className='min-[320px]:11/12 md:w-1/2  p-4 m-auto mt-8 h-full grid place-content-center gap-8' onSubmit={(e) => submitHandler(e)}>
            <h2 className='text-4xl font-bold text-center text-gray-500 bg-slate-100/50'>Shipping Address</h2>
            <input className="h-10 border-2 px-4 " placeholder='Address' value={address} onChange={(e) => onChangeHandler(e, setAddress)}  required autoFocus/>
            <input className="h-10 border-2 px-4 " placeholder='City' value={city} onChange={(e) => onChangeHandler(e, setCity)}  required autoFocus/>
            <input className="h-10 border-2 px-4 " placeholder='State' value={state} onChange={(e) => onChangeHandler(e, setState)} required autoFocus />
            <select className="h-10 border-2 px-4 " defaultValue={country} placeholder="Choose Country" onChange={(e) => onChangeHandler(e, setCountry)} required autoFocus>
                {countries.map(country => (<option key={country} value={country}>{country}</option>))}
            </select>
            <input className="h-10 border-2 px-4 " placeholder='Pincode' value={pincode} onChange={(e) => onChangeHandler(e, setPincode)}  required autoFocus/>
            <input type='submit' value="Checkout" className='border-2 w-full rounded-sm border-blue-400 text-blue-400 cursor-pointer transition-all ease-in-out hover:text-white hover:bg-blue-400' />
        </form>
    )
}

export default Shipping