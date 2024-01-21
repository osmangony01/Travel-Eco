import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axiosInstance from '../../../routes/axiosInstance';
import { AuthContext } from '../../../provider/AuthProvider';

const AllPost = () => {

    const { user } = useContext(AuthContext);
    const [post, setPost] = useState([]);

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

    useEffect(() => { }, [post])

    console.log(post)

    return (
        <div className='w-full md:w-[800px] mx-auto bg-white my-2 p-4 md:p-6 text-sm h-[500px]'>
            {
                post.map((item, index) => {
                    return <div className=' border p-4 rounded my-2' key={index}>
                        <div className='flex gap-2'>
                            <label className="btn btn-ghost btn-circle avatar m-0">
                                <div className="w-10 rounded-full">
                                    <FaUserCircle size={40}></FaUserCircle>
                                </div>
                            </label>
                            <span>{item.user?.name}</span>
                        </div>
                        <div>{item.post_title}</div>
                        <div>{item.post_content}</div>
                        <div>images</div>
                        <hr className='my-2'></hr>
                        <div className='flex justify-between'>
                            <div>Like</div>
                            <div>Comment</div>
                        </div>
                    </div>
                })
            }
        </div>

    );
};

export default AllPost;


