import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { movieRef } from "../firebase/firebase";
import swal from 'sweetalert';
import { Appstate } from "../App";
import {  useNavigate } from "react-router-dom";


const AddMovies = () => {
  const useAppState = useContext(Appstate);
  const navigate = useNavigate()
  const [form,setForm] = useState({
    title:"",
    year:"",
    description:"",
    img:"",
    rated:0,
    rating:0,
  });
  const [loading,setLoading] = useState(false);

  const addmovie = async ()=>{
    setLoading(true)
    if(useAppState.login){
      await addDoc(movieRef,form)
      swal({
        title:"Sucessfully Added",
        icon:"success",
        buttons:false,
        timer:3000,
      })
      setForm({
      title:"",
      year:"",
      description:"",
      img:""
      })
      setLoading(false);
    }else{
      navigate('/login')
    }

  } 
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              Add Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="Title"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="Title"
                    name="Title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="Year" className="leading-7 text-sm text-gray-300">
                    Year
                  </label>
                  <input
                    type="text"
                    id="Year"
                    name="Year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="Year" className="leading-7 text-sm text-gray-300">
                    Image Url
                  </label>
                  <input
                    type="text"
                    id="Year"
                    name="Image"
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img: e.target.value })}
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={addmovie} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                 {loading?<TailSpin height={25} color="white"/>:'Submit'} 
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovies;
