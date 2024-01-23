// ShowComment.jsx

import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { PiUserCircleLight } from 'react-icons/pi';
import { FiCircle } from 'react-icons/fi';

const ShowComment = ({ postID, comments, status, handleShowCommentModal }) => {
    const filterComments = comments.filter(comment => comment.post_id === postID);

    return (
        <div>
            {status && filterComments.length>0 && (
                <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
                    <div className='relative bg-white rounded-md shadow-lg w-[500px] text-[15px] mx-auto inline-block text-sm'>
                        <span onClick={() => handleShowCommentModal(false)} className='absolute top-[10px] right-[10px] hover:bg-slate-200 p-2 rounded-full'>
                            <RxCross1 color='' size={18}></RxCross1>
                        </span>
                        <div className='flex mt-4 items-center py-1 px-3'>
                            <span className='bg-gray-200 rounded-full p-2'>
                                <FiCircle />
                            </span>
                            <span className='pl-2'>All Comments</span>
                        </div>
                        <hr></hr>
                        {filterComments.map((item, index) => (
                            <div className="p-4 flex gap-2" key={index}>
                                <div><PiUserCircleLight size={30} /></div>
                                <div className='w-full bg-gray-100 py-2 px-3 rounded-xl'>
                                    <div className='font-semibold'>{item.user.name}</div>
                                    <div className=''>{item.post_comment_content} </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowComment;











// import React, { useContext, useEffect, useState } from 'react';
// import { RxCross1 } from "react-icons/rx";
// import { AuthContext } from '../../../provider/AuthProvider';
// import axiosInstance from '../../../routes/axiosInstance';
// import { LuSend } from "react-icons/lu";
// import useAllComment from '../../hooks/useComment';
// import { FiCircle } from "react-icons/fi";
// import { PiUserCircleLight } from "react-icons/pi";

// const ShowComment = ({ postID,comments, status, handleShowCommentModal }) => {

//     // const [message, setMessage] = useState('');
//     // const { user } = useContext(AuthContext);
//     // const { comments, loading, error } = useAllComment();
//     const [filterComments, setFilterComments] = useState([]);

//     const handleModal = () => {
//         handleShowCommentModal(false)
//     }
//     const modal = status;

//     // const filter = comments.filter(comment => comment.post_id === postID);

//     useEffect(() => {
//         setFilterComments(comments.filter(comment => comment.post_id === postID));
//     }, [comments,postID])

//     console.log(filterComments);

//     return (
//         <div>
//             {
//                 modal && <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
//                     <div className='relative bg-white rounded-md shadow-lg w-[500px] text-[15px] mx-auto inline-block text-sm'>
//                         <span onClick={handleModal} className='absolute top-[10px] right-[10px] hover:bg-slate-200 p-2 rounded-full'><RxCross1 color='' size={18}></RxCross1></span>
//                         <div className='flex mt-4 items-center py-1 px-3'>
//                             <span className='bg-gray-200 rounded-full p-2'><FiCircle /></span>
//                             <span className='pl-2'>All Comments</span>
//                         </div>
//                         <hr></hr>
//                         {
//                             filterComments?.map((item, index) => {
//                                 return <div className="p-4 flex gap-2" key={index}>
//                                     <div><PiUserCircleLight size={30} /></div>
//                                     <div className='w-full bg-gray-100 py-2 px-3 rounded-xl'>
//                                         <div className='font-semibold'>{item.user.name}</div>
//                                         <div className=''>{item.post_comment_content} </div>
//                                     </div>
//                                 </div>
//                             })
//                         }

//                     </div>
//                 </div>

//             }
//             {
//                 // modal && <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
//                 //     <div className='relative bg-white rounded-md shadow-lg w-[500px] text-[15px] mx-auto inline-block text-sm'>
//                 //         <span onClick={handleModal} className='absolute top-[10px] right-[10px] hover:bg-slate-200 p-2 rounded-full'><RxCross1 color='' size={18}></RxCross1></span>
//                 //         <div className='flex mt-4 items-center py-1 px-3'>
//                 //             <span className='bg-gray-200 rounded-full p-2'><FiCircle /></span>
//                 //             <span className='pl-2'>All Comments</span>
//                 //         </div>
//                 //         <hr></hr>
//                 //         {
//                 //             filterComments?.map((item, index) => {
//                 //                 return <div className="p-4 flex gap-2" key={index}>
//                 //                     <div><PiUserCircleLight size={30} /></div>
//                 //                     <div className='w-full bg-gray-100 py-2 px-3 rounded-xl'>
//                 //                         <div className='font-semibold'>{item.user.name }</div>
//                 //                         <div className=''>{item.post_comment_content} </div>
//                 //                     </div>
//                 //                 </div>
//                 //             })
//                 //         }

//                 //     </div>
//                 // </div>
//             }
//         </div>
//     );
// };

// export default ShowComment;