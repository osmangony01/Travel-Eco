import React, { useContext, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from '../../../provider/AuthProvider';
import axiosInstance from '../../../routes/axiosInstance';

const CreatePost = ({ status, handleAddModal }) => {

    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useContext(AuthContext);

    const handleModal = () => {
        handleAddModal(false)
    }
    const modal = status;

    const createPost = async (formData) => {
        const config = {
            headers: {'Content-Type': 'multipart/form-data',}
        };

        try {
            const res = await axiosInstance.post('/create-post', formData, config);
            console.log(res);
            if (res.data.status == 201) {
                console.log('created');
            }
        } catch (error) {
            // Handle error response
            if (error.response) {
                console.log(error.response.data); // Validation errors or other error details
                const errors = error.response.data.errors;
                console.log(errors)
                // You can update the state or display an error message to the user
                // For example, setPassError(errors.password[0]);
            } else {
                console.error('Error with no response from server:', error.message);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = user?.id;
        const formData = new FormData();
        formData.append('user_id', id);
        formData.append('post_title', title);
        formData.append('post_content', content);
        

        for (let i = 0; i < images.length; i++) {
            formData.append(`images[${i}]`, images[i]);
        }
        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        createPost(formData);
    }

    return (
        <div>
        {
            modal && <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
                <div className='relative bg-white rounded-md shadow-lg w-[500px] text-[15px] mx-auto inline-block'>
                    <span onClick={handleModal} className='absolute top-[15px] right-[15px] hover:bg-slate-200 p-2 rounded-full'><RxCross1 color='' size={20}></RxCross1></span>
                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            <h1 className='text-center font-semibold text-2xl pb-4'>Create Post</h1>
                            <div className='flex flex-col mt-3'>
                                {/* <label className='pb-1'>Title</label> */}
                                <input type="text" onChange={(e)=>setTitle(e.target.value)}  value={title} name="task_title" className='w-full  box-border py-1.5 px-1  border-transparent border-b border-b-[#d4d4d4] outline-none placeholder:text-sm hover:border-b-[#5e3cf7fb] hover:border-b-2' placeholder='Enter title' />
                            </div>
                            
                            <div className='flex flex-col mt-3'>
                                {/* <label className='pb-1'>Description</label> */}
                                <textarea onChange={(e)=>setContent(e.target.value)} value={content}  name="task_description"  className='w-full  box-border py-1.5 px-1  border-transparent outline-none placeholder:text-sm ' rows={3} placeholder="Type Content..." ></textarea>
                            </div>
                            <div className='flex flex-col mt-3'>
                                <label className='pb-1'>Add Images</label>
                                <input type="file" onChange={(e)=>setImages(e.target.files)}  name="images" placeholder='choose images' multiple/>
                            </div>
                            <div className='mt-4'> <button type='submit' className='text-right px-4 py-1.5 bg-[#5e3cf7fb] text-white rounded shadow-md hover:bg-[#3d3bbefb]'>Create Post</button></div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </div>
    );
};

export default CreatePost;