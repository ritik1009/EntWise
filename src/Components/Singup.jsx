import React from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from '../firebase/firebase'
import swal from "sweetalert";
import { userRef } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const auth = getAuth(app)

const Singup = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile:"",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent,setOtpSent] = useState(false);
  const [otp,setOtp] = useState('')
  

  const generateRecaptha=()=>{
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container",{
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    },auth);
    }

    const requestOtp = ()=>{
        setLoading(true)
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            swal({
                text:"OTP Sent",
                icon:"success",
                buttons: false,
                timer:3000,
            })
            setOtpSent(true);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error)
          });

    }

    const verifyOtp = ()=>{
        try {
            setLoading(true);
            window.confirmationResult.confirm(otp).then((result)=>{
                uploadData()
                swal({
                  text: "Sucessfully Registered",
                  icon: "success",
                  buttons: false,
                  timer: 3000,
                });
                navigate('/login')
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const uploadData =async()=>{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(form.password,salt);
        console.log("hash",hash)
        await addDoc(userRef,{name: form.name,
    email: form.email,
    mobile:form.mobile,
    password:hash})
    }

  return (
    <div className="w-full flex flex-col mt-4 justify-center items-center">
      <h1 className="text-2xl font-bold w-full text-center">Sign Up</h1>
      {otpSent ? (
        <>
          <div className="p-2  w-1/3">
            <div className="relative">
              <label for="Mobile" className="leading-7 text-sm text-gray-300">
                OTP
              </label>
              <input
                type="number"
                id="OTP"
                name="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <button className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg" onClick={verifyOtp}>
              {loading ? <TailSpin height={25} color="white" /> : "Verify OTP"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="p-2 w-1/3">
            <div className="relative">
              <label for="Name" className="leading-7 text-sm text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/3">
            <div className="relative">
              <label for="Email" className="leading-7 text-sm text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2  w-1/3">
            <div className="relative">
              <label for="Mobile" className="leading-7 text-sm text-gray-300">
                Mobile no.
              </label>
              <input
                type="number"
                id="Mobile"
                name="Mobile"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2  w-1/3">
            <div className="relative">
              <label for="Password" className="leading-7 text-sm text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="p-2 w-full">
            <button
              className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
              onClick={requestOtp}
            >
              {loading ? <TailSpin height={25} color="white" /> : "Request OTP"}
            </button>
          </div>
        </>
      )}
      <div>
        <p>
          Already have a account?
          <Link to="/login">
            <span className="text-blue-500">Login</span>
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Singup;
