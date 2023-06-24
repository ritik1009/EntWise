import React, { useContext, useEffect } from 'react';
import ReactStars from 'react-stars';
import { useState } from 'react';
import { reviewRef,db } from '../firebase/firebase';
import { addDoc,doc,getDocs,updateDoc, query,where } from 'firebase/firestore';
import { Bars, ThreeDots } from 'react-loader-spinner';
import swal from "sweetalert";
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id , prevRating, userRated}) => {
    const navigate = useNavigate()
    const useAppState = useContext(Appstate)
    const [rating,setRating] = useState(0)
    const [loading,setLoading] = useState(false)
    const [form,setForm] = useState('')
    const[reviews,setReviews]=useState([])
    const [reviewsLoading,setReviewsLoading] = useState(true)
    const [newAdded,setNewAdded] = useState(0)
    const SendReview = async()=>{
        try {
            if(useAppState.login){
                setLoading(true)
                console.log("rating------------",rating)
                await addDoc(reviewRef,{
                    movie_id:id,
                    name:useAppState.userName,
                    rating:rating,
                    thoughts:form,
                    timestamp:new Date().getTime(),
                })
                const ref = doc(db,'movie',id);
                await updateDoc(ref,{
                    rating: (prevRating +rating)/2,
                    rated: userRated +1
                })
                setLoading(false);
                swal({
                  title: "Reviews Sent",
                  icon: "success",
                  buttons: false,
                  timer: 3000,
                });
                setNewAdded(newAdded+1)
                setForm('')
                setRating(0)
            }else{
                navigate('/login')
            }

        } catch (error) {
            swal({
              title: error,
              icon: "error",
              buttons: false,
              timer: 3000,
            });
        }
    }
    useEffect(()=>{
        async function get_Reviews(){
            setReviewsLoading(true);
            setReviews([])
            let query_ = query(reviewRef,where('movie_id','==',id))
            const _data = await getDocs(query_);
            console.log(_data);
            _data.forEach((doc)=>{
                setReviews(prev=>[...prev,doc.data()])
            })
            setReviewsLoading(false);
        }get_Reviews();
    },[newAdded])
  return (
    <div className="mt-4  border-t-2 border-gray-700 w-full">
        {useAppState.login?<div>
      <ReactStars
        count={5}
        size={30}
        color2={"#ffd700"}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        type="text"
        placeholder="Share Your Thoughts"
        className="w-full p-2 outline-none header"
        onChange={(e)=>setForm(e.target.value)}
        value={form}
      />
      <button className="p-2 mt-3 flex justify-center bg-green-700 w-full" onClick={SendReview}>
        {loading?<Bars height={15} color='white'/>:'Share'}
        </button>
        </div>:null}
        {reviewsLoading?<div className='mt-6 flex justify-center'>
            <ThreeDots height={23} color='white'/>
            </div>:<div>
                {
                    reviews.map((item,idx)=>{
                        return (
                          <div
                            className="bg-gray-800 mt-2 w-full p-2"
                            key={idx}
                          >
                            <div className="flex items-center">
                              <p className="text-blue-500">{item.name} </p>
                              <p className="ml-2 text-sm">
                                ({new Date(item.timestamp).toLocaleString()})
                              </p>
                            </div>
                            <ReactStars
                              count={5}
                              size={24}
                              color2={"#ffd700"}
                              edit={false}
                              value={item.rating}
                            />
                            <p>{item.thoughts}</p>
                          </div>
                        );
                    })
                }
            </div>}
    </div>
  );
}

export default Reviews