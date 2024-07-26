import React, { useState } from 'react'
import { Elements, PaymentElement, useStripe, useElements, } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useNewOrderMutation } from '../redux/api/orderApi';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../redux/reducers/cartReducer';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);



const CheckoutForm = () => {

    const [createOrder] = useNewOrderMutation();
    const {cartReducer} = useSelector(state=>state)
    const {_id} = useSelector(state=>state.userReducer.user)

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return

        setIsProcessing(true)

        const orderData = {...cartReducer,user:_id};

        console.log(orderData)   
        const { paymentIntent, error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: { return_url: window.location.origin },
            redirect: "if_required"
        });

        if (error) {
            // Show error to your customer (for example, payment details incomplete)
            setIsProcessing(false)
            return toast.error(error.message || "Something went wrong");
        }

        if ([paymentIntent.status === "succeeded"]) {
            const res = await createOrder(orderData);
            dispatch(resetCart());
            toast.success("Order Placed Successfully")
            navigate("/orders")
        }
        setIsProcessing(false);

    }

    return (
        <div className='flex justify-center items-center w-full p-8'>

            <form onSubmit={submitHandler} className='shadow-4xl p-4 flex flex-col justify-center items-center rounded-md gap-4'>
                <PaymentElement />
                <button className="m-auto md:w-3/4 min-[320px]:w-11/12 transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed">{isProcessing ? "Processing..." : "Pay"}</button>
            </form>
        </div>
    )

}


const Checkout = () => {

    const location = useLocation();
    // getting clientSecret generated while creating paymentIntent
    const clientSecret = location.state;
    if(!clientSecret) return <Navigate to="/shipping" />
    return <Elements stripe={stripePromise} options={{
        clientSecret
    }}>
        <CheckoutForm />
    </Elements>

}

export default Checkout