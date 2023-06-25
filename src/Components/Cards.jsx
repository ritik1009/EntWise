import React, { useEffect, useState } from 'react'
import {  BallTriangle } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from 'firebase/firestore';
import { movieRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
      async function getData(){
        setData([])
        const data_=await getDocs(movieRef);
        console.log("Environment -----",process.env)
        data_.forEach((doc)=>{
          setData((prv)=>[...prv,{...(doc.data()),id: doc.id}])
        });
        setLoading(false);
      }getData();
    },[])
  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <BallTriangle height={200} width={200} color="red" radius={5} />
        </div>
      ) : (
        data.map((item, idx) => {
          return (
            <Link to={`/detail/${item.id}`}>
              <div className=" card shadow-xl hover:shadow-slate-400 p-1 md:p-2 cursor-pointer text-sm duration-300 font-small md:font-medium  mt-6 gap-2">
                <img
                  className="h-52 md:h-72 w-32 md:w-52 hover:scale-105 duration-300"
                  src={item.img}
                  alt=""
                />
                <h1 className="w-32 md:w-52 truncate pt-2">
                  <span className="text-red-500">Name:-</span> {item.title}
                </h1>
                <h1 className="flex items-center">
                  <span className="text-red-500 mr-1">Rating:-</span>
                  <ReactStars
                    count={5}
                    size={17}
                    color2={"#ffd700"}
                    value={item.rating}
                    edit={false}
                    
                  />
                </h1>
                <h1>
                  <span className="text-red-500">Year:-</span> {item.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default Cards