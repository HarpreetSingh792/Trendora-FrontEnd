import React, { useState } from 'react';
import { FaRegEdit, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useAdd_updateReviewMutation, useDeleteReviewMutation } from '../redux/api/productApi';
import toast from 'react-hot-toast';
import PopUp from './PopUp';

const ReviewCard = ({ reviewId, name, photo, comment, rating, userId, pdId }) => {

  const stars = new Array(parseInt(rating)).fill(0);
  const remaining = new Array(5 - parseInt(rating)).fill(0);
  const { _id } = useSelector(state => state?.userReducer?.user ?? "")

  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment || "");
  const [editRatings, setEditRatings] = useState(rating || 1);

  const [deleteReview] = useDeleteReviewMutation()
  const [addReview] = useAdd_updateReviewMutation();
  return (
    <div className='relative w-full rounded-md flex flex-col justify-center items-start'>
      <div className='flex justify-start gap-4 items-center'>
        <img className='rounded-full w-12' src={photo} alt={`${name}-pic`} />
        <div>
          <p className='text-gray-700 font-semibold tracking-wide'>{name}</p>
          <div className='flex justify-start w-1/5 items-center'>
            {
              stars?.map((_, idx) => <span key={idx} className='text-yellow-500'><FaStar /></span>)
            }
            {

              remaining?.map((_, idx) => <span key={idx} className='text-yellow-500'><FaRegStar /></span>)
            }

          </div>
        </div>
        {
          _id && _id === userId && <div className='absolute top-2 right-2 flex justify-between gap-2'>
            <button className='outline-none border-none' onClick={() => setIsEdit(true)}><FaRegEdit /></button>
            <button className='outline-none border-none hover:text-red-500' onClick={() => {
              deleteReview(reviewId)
              toast.success("Review Deleted")
            }}><FaTrash /></button>
          </div>
        }
      </div>

      <p className='pl-16 break-words text-justify'>{comment}</p>

      <div className='w-full'>
        {isEdit && <PopUp setIsOpen={setIsEdit} >
          <form className='border-2 p-4 md:w-1/2 min-[320px]:w-11/12  h-fit bg-white rounded-xl flex flex-col justify-start items-start  overflow-auto' onClick={(e) => {
            e.stopPropagation();
            e.preventDefault()
          }
          }>
            <div className='flex flex-col  min-[320px]:justify-center md:justify-between items-center w-full p-4 gap-4'>
              <fieldset className='border-2 border-blue-500 w-full pl-4'>
                <legend htmlFor="comment" className='text-xl text-blue-500 font-semibold'>Comment</legend>

                <textarea name='comment' rows={5} maxLength={200} placeholder={comment} value={editComment} className='outline-none border-none w-full px-4 py-2 text-pretty break-words' onChange={(e) => setEditComment(e.target.value)} />
              </fieldset>
              <fieldset className='border-2 border-blue-500 w-full pl-4'>
                <legend htmlFor="ratings" className='text-xl text-blue-500 font-semibold'>Ratings </legend>
                <input className='h-10 px-4 w-full border-none outline-none' min={1} max={5} type='number' name='ratings' value={editRatings} onChange={(e) => setEditRatings(e.target.value)} />
              </fieldset>
            </div>
            <button className="m-auto md:w-1/2 min-[320px]:w-11/12 transition-all  border-2 border-blue-500 rounded-md py-2 px-4 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed" onClick={(e) => {
              addReview({
                pdId,
                userId,
                data: {
                  comments: editComment,
                  ratings: editRatings,
                }
              })
              toast.success("Review is Updated")
            }}>Update</button>

          </form>
        </PopUp>
        }

      </div>
    </div>


  )
}

export default ReviewCard