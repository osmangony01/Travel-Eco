import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useSpecificUserPost from '../../hooks/useSpecificUserPost';
import useAllComment from '../../hooks/useComment';
import PostLoading from '../../../utils/PostLoading';
import { FaUserCircle } from 'react-icons/fa';
import CreateComment from '../Post/CreateComment';
import ShowComment from '../Post/ShowComment';
import { TbMessage } from 'react-icons/tb';
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';

const UserPost = () => {
    const { user } = useContext(AuthContext);
    const [addModel, setAddModal] = useState(false);
    const [commentModals, setCommentModals] = useState({});

    const [postControl, setPostControl] = useState(false);
    const { userPosts, loading, error } = useSpecificUserPost();
    //const [showCommentModal, setShowCommentModal] = useState(false);

    const { comments, } = useAllComment();


    const handleAddModal = (status) => {
        setAddModal(status)
    }

    // const handleShowCommentModal = (status) => {
    //     setShowCommentModal(status)
    // }

    const handleShowCommentModal = (postId, status) => {
        setCommentModals((prev) => ({ ...prev, [postId]: status }));
    }

    useEffect(() => { }, [userPosts, comments])
    // useEffect(() => { }, [places])

    console.log(userPosts)
    //console.log(comments)

    return (
        <div className='w-full md:w-[650px] mx-auto rounded p-1 text-sm '>
            {
                !userPosts && <PostLoading></PostLoading>
            }
            {
                userPosts?.map((item, index) => {
                    return <div className=' border rounded-lg  bg-white my-3 cd' key={index}>
                        <div className='p-4'>
                            <div className='flex gap-2 items-center justify-between'>
                                <div>
                                    <label className="btn btn-ghost btn-circle avatar m-0">
                                        <div className="w-10 rounded-full">
                                            <FaUserCircle size={40}></FaUserCircle>
                                        </div>
                                    </label>
                                    <span>{item.user?.name}</span>
                                </div>
                                <div className="relative" onClick={() => setPostControl(!postControl)}>
                                    <label className="btn btn-ghost btn-circle avatar m-0">
                                        <div className=" rounded-full flex items-center">
                                            <BsThreeDots size={25} />
                                        </div>
                                    </label>
                                    {
                                        postControl && <div className="absolute border rounded-lg right-0 top-12 z-10 text-black bg-white border-gray-300">
                                            <ul className="menu menu-compact mt-1 p-1 shadow bg-base-100 rounded-md w-52">
                                                <li className="my-1 hover:text-violet-600 hover:font-semibold"><Link>Edit Post</Link></li>
                                                <li className="my-1 hover:text-violet-600 hover:font-semibold" ><Link>Delete Post</Link></li>
                                            </ul>
                                        </div>
                                    }
                                </div>
                                {/* <div>
                                    <BsThreeDots size={30} />
                                </div> */}
                            </div>
                            <div className='font-semibold text-lg'>{item.post_title}</div>
                            <div className=''>{item.post_content}</div>
                        </div>
                        <div className='p-1'>
                            {item.post_image?.length > 0 && (

                                <img
                                    src={`${import.meta.env.VITE_FILE_PATH}${item.post_image[0].post_image}`}
                                    alt="image"
                                    className='rounded-sm h-[250px] w-full'
                                />
                            )}
                        </div>
                        {
                            user &&
                            <div className='p-4'>
                                <div className='flex text-sm justify-between'>
                                    <div></div>
                                    <div onClick={() => handleShowCommentModal(item.id, true)} className='hover:text-blue-600 hover:underline cursor-pointer'><span>{item.post_comment.length > 0 ? <span>{item.post_comment.length} comments</span> : ''} </span></div>
                                </div>
                                <hr className='my-2'></hr>
                                <div className='flex justify-between'>
                                    <div>Like</div>
                                    <div onClick={() => handleAddModal(true)} className='hover:text-blue-500 cursor-pointer hover:underline flex items-center'><TbMessage /> <span className='pl-1'>Comment</span></div>
                                </div>
                            </div>
                        }

                        {<CreateComment postID={item.id} userID={user?.id} status={addModel} handleAddModal={handleAddModal}></CreateComment>}
                        {/* {<ShowComment postID={item.id} comments={comments} status={showCommentModal} handleShowCommentModal={handleShowCommentModal}></ShowComment>} */}
                        {<ShowComment postID={item.id} comments={comments} status={commentModals[item.id]} handleShowCommentModal={(status) => handleShowCommentModal(item.id, status)}></ShowComment>}
                    </div>
                })
            }
        </div>

    );
};

export default UserPost;