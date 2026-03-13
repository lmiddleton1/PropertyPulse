'use client';
import { useState, useEffect } from 'react';
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from 'react-toastify';
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property}) => {
   const { data: session } = useSession();
   const userId = session?.user?.id;

   const [isBookmarked, setIsBookmarked] = useState(false);
   const [loading, setLoading] = useState(true);


useEffect(() => { 
  if (!userId) {
    setLoading(false);
    return;
  }

  checkBookmarkStatus(property._id).then((res) => {
    if (res.error) toast.error(res.error);
    if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
    setLoading(false);


  });


}, [property._id, userId, checkBookmarkStatus]);   




      const handleClick = async () => {
        if (!userId) {
          toast.error('You need to be signed in to bookmark a listing');
          return;
        }

        bookmarkProperty(property._id).then((res) => {
          if (res.error) return toast.error(res.error);
          setIsBookmarked(res.isBookmarked);
          toast.success(res.message);
        });

      };

      if (loading) {
        return <p className="text-center">Loading...</p>
      }

    
    return isBookmarked ? (
      <button
        className='w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-medium py-2.5 px-4 rounded-xl text-sm transition-colors'
        onClick={handleClick}
      >
        <FaBookmark className="text-xs" /> Remove Bookmark
      </button>
    ) : (
      <button
        className='w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors'
        onClick={handleClick}
      >
        <FaBookmark className="text-xs" /> Bookmark Property
      </button>
    );
}
 
export default BookmarkButton;