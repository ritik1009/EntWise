import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {Bars} from 'react-loader-spinner'
import Reviews from './Reviews';

const Details = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        title:"",
        img:"",
        description:"",
        year:"",
        rating:0,
        rated:0,
    });
    useEffect(()=>{
      async function get_data() {
        setLoading(true);
        const _doc = doc(db, "movie", id);
        const _data = await getDoc(_doc);
        console.log(_data);
        setData(_data.data());
        setLoading(false);
      }
      get_data();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="p-4 mt-4 w-full flex flex-col md:flex-row items-center md:items-start justify-center ">
      {loading ? (
        <div className="h-96 flex w-full justify-center items-center">
          <Bars height={25} color="white" />
        </div>
      ) : (
        <>
          <img className="h-96 md:sticky md:top-20" src={data.img} alt="" />
          <div className="md:ml-4 w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-400">
              {data.title} <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars count={5} size={24} color2={"#ffd700"} value={data.rating} edit={false} />
            <p className="mt-3">{data.description}</p>
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </>
      )}
    </div>
  );
}

export default Details