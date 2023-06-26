import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {Bars} from 'react-loader-spinner'
import Reviews from './Reviews';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import { Appstate } from '../App';



const Details = () => {
  const useAppState = useContext(Appstate);
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
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={data.rating}
              edit={false}
            />
            <p className="mt-3">{data.description}</p>
            <p className="mt-3">
              <span className="text-blue-500">Director:-</span> {data.directors}
            </p>
            <p className="mt-3">
              <span className="text-blue-500">Actor:-</span> {data.actors}
            </p>
            <p className="mt-3">
              <span className="text-blue-500">Writer:-</span> {data.writers}
            </p>
            <p className="mt-3">
              <span className="text-blue-500">Watch Online:-</span> {data.ott}
            </p>
            <p className="mt-3">
              <span className="text-blue-500">Download Links:-</span> {data.ott}
            </p>
            {useAppState.role==='admin'?
            <Link to={`/detail/edit/${id}`}>
              <h1 className="text-lg text-white flex items-center cursor-pointer mt-5 hover:bg-gray-500 text-center justify-center">
                <Button className=" pr-2">
                  <EditIcon className="mr-2" color="secondary" />
                  <span className="text-white ">Edit </span>
                </Button>
              </h1>
            </Link>:null}
            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
          </div>
        </>
      )}
    </div>
  );
}

export default Details