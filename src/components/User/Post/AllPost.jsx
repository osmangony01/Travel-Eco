import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axiosInstance from '../../../routes/axiosInstance';
import { AuthContext } from '../../../provider/AuthProvider';
import CreateComment from './CreateComment';
import { TbMessage } from "react-icons/tb";
import useAllComment from '../../hooks/useComment';
import ShowComment from './ShowComment';
import PostLoading from "../../../utils/PostLoading";

const AllPost = () => {

    const { user } = useContext(AuthContext);
    const [post, setPost] = useState([]);
    const [addModel, setAddModal] = useState(false);
    //const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentModals, setCommentModals] = useState({});

    const { comments, loading, error } = useAllComment();


    const handleAddModal = (status) => {
        setAddModal(status)
    }

    // const handleShowCommentModal = (status) => {
    //     setShowCommentModal(status)
    // }

    const handleShowCommentModal = (postId, status) => {
        setCommentModals((prev) => ({ ...prev, [postId]: status }));
    }

    const fetchAllPost = async () => {
        try {
            // Fetch tasks based on the search term
            const response = await axiosInstance.get("/allPost")
            //setTasks(response.data);
            console.log(response)
            if (response.data?.posts) {
                setPost(response.data.posts);
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data
                console.log(errors);
            } else {
                console.error('Error with no response from server:', error.message);
            }
        }
    }


    useEffect(() => {
        fetchAllPost()
    }, [])

    useEffect(() => { }, [post, comments])
    // useEffect(() => { }, [places])




    console.log(post)
    console.log(comments)

    return (
        <div className='w-full md:w-[650px] mx-auto rounded p-1 text-sm '>
            {
                !post && <PostLoading></PostLoading>
            }
            {
                post?.map((item, index) => {
                    return <div className=' border rounded-lg  bg-white my-3 hover:border-violet-300' key={index}>
                        <div className='p-4'>
                            <div className='flex gap-2 items-center'>
                                <label className="btn btn-ghost btn-circle avatar m-0">
                                    <div className="w-10 rounded-full">
                                        <FaUserCircle size={40}></FaUserCircle>
                                    </div>
                                </label>
                                <span>{item.user?.name}</span>
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

export default AllPost;


