import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useLoginMutation } from "../redux/api/userApi"

const SignIn = () => {

  const navigate = useNavigate();
  const date = new Date();
  const [login] = useLoginMutation();
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState(date)
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        _id: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        gender,
        dob
      })
      if ("data" in res) {
        toast.success(res.data.message);
        navigate(window.location.origin)

      }
      else {
        toast.error(res.error.data.message);

      }

    } catch (error) {
      toast.error("Sign-in Failed")
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();

    if (!dob || !gender) toast.error("Please fill all the required fields")

    loginHandler();

  }


  return (
    <div className='lg:w-2/5 min-[320px]:w-4/5 m-auto mt-12 shadow-4xl rounded-lg'>
      <form className='w-full grid place-items-center gap-9 pt-4 pb-4' onSubmit={submitHandler}>
        <h2 className='text-4xl text-blue-500'>Login</h2>
        <fieldset className='min-[320px]:w-11/12 md:w-4/5 border-2 hover:border-blue-500 pl-5'>
          <legend className='text-blue-500 font-semibold'>Gender</legend>
          <select className='w-full h-full pr-2 border-none outline-none cursor-pointer' name="gender" onChange={(e) => setGender(e.target.value)} value={gender} required>
            <option value={""}></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </fieldset>
        <fieldset className='min-[320px]:w-11/12 md:w-4/5 border-2 hover:border-blue-500 pl-5'>
          <legend className='text-blue-500 font-semibold'>Date of Birth</legend>
          <input className='w-full h-full pr-2 border-none outline-none' type='date' placeholder='Enter your dob' value={dob} onChange={(e) => setDob(e.target.value)} required />
        </fieldset>
        <button className="min-[320px]:w-11/12 md:w-1/2 h-12 rounded-md text-white flex justify-center items-center gap-5 border-2 border-blue-500 bg-gradient-to-r from-blue-400 to-blue-600" ><span className=' bg-blend-multiply text-2xl'><FcGoogle /></span> Sign in With Google</button>

      </form>
    </div>
  )
}

export default SignIn;