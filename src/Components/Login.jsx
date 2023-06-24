import React from 'react';
import { useState,useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { getDocs, query,where } from 'firebase/firestore';
import { userRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs'
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const UseAppState = useContext(Appstate);
    const [form, setForm] = useState({
        mobile:'',
      email:'',
      password:''
    });
    const [loading, setLoading] = useState(false);
    const login = async()=>{
        setLoading(true)
        try {
            const query_ = query(userRef, where('mobile','==',form.mobile))
            console.log(form.mobile)
            const querySnapShot = await getDocs(query_)
            console.log(querySnapShot)
            querySnapShot.forEach((doc)=>{
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password,_data.password)
                if(isUser){
                    console.log(_data)
                    UseAppState.setLogin(true)
                    UseAppState.setUserName(_data.name);
                    UseAppState.setUserId(doc.id);
                    swal({
                      title: "Logged In",
                      icon: "success",
                      buttons: false,
                      timer: 3000,
                    });
                    navigate('/')
                }else{
                    swal({
                      title: "Invalid Credentials",
                      icon: "error",
                      buttons: false,
                      timer: 3000,
                    });

                }
            })
                
            }catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="w-full flex flex-col mt-4 justify-center items-center">
      <h1 className="text-2xl font-bold w-full text-center">Login</h1>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label for="mobile_no" className="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            // type="number"
            id="mobile_no"
            name="mobile_no"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label for="Password" className="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full mt-2">
        <button className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg" onClick={login}>
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div>
        <p>
          Do not have a account?{" "}
          <Link to="/sign_up">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login