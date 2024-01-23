import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axiosInstance from '../../../routes/axiosInstance';
import { AuthContext } from '../../../provider/AuthProvider';
import CreateComment from './CreateComment';
import { TbMessage } from "react-icons/tb";
import useAllComment from '../../hooks/useComment';
import ShowComment from './ShowComment';

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
        <div className='w-full md:w-[800px] mx-auto bg-white rounded min-h-[500px] my-2 p-4 md:p-6 text-sm '>
            {
                !post && <h1 className='text-red-500 text-lg'>Post are not found</h1>
            }
            {post?.map((item, index) => {
                return <div className=' border p-4 rounded my-10' key={index}>
                    <div className='flex gap-2 items-center'>
                        <label className="btn btn-ghost btn-circle avatar m-0">
                            <div className="w-10 rounded-full">
                                <FaUserCircle size={40}></FaUserCircle>
                            </div>
                        </label>
                        <span>{item.user?.name}</span>
                    </div>
                    <div className='font-semibold text-lg'>{item.post_title}</div>
                    <div>{item.post_content}</div>
                    <div className='py-2'>
                        {item.post_image?.length > 0 && (

                            <img
                                src={`${import.meta.env.VITE_FILE_PATH}${item.post_image[0].post_image}`}
                                alt="image"
                                className='rounded h-[250px] w-full'
                            />
                        )}
                    </div>
                    <div className='flex text-sm justify-between'>
                        <div></div>
                        <div onClick={() => handleShowCommentModal(item.id, true)} className='hover:text-blue-600 hover:underline cursor-pointer'><span>{item.post_comment.length > 0 ? <span>{item.post_comment.length  } comments</span>:''} </span></div>
                    </div>
                    {user && <hr className='my-2'></hr>}
                    {user && <div className='flex justify-between'>
                        <div>Like</div>
                        <div onClick={() => handleAddModal(true)} className='hover:text-blue-500 cursor-pointer hover:underline flex items-center'><TbMessage /> <span className='pl-1'>Comment</span></div>
                    </div>}
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


