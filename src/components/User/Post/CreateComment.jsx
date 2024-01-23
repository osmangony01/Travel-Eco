import React, { useContext, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from '../../../provider/AuthProvider';
import axiosInstance from '../../../routes/axiosInstance';
import { LuSend } from "react-icons/lu";

const CreateComment = ({ postID, userID, status, handleAddModal }) => {

    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext);

    const handleModal = () => {
        handleAddModal(false)
    }
    const modal = status;

    const createComment = async (comment) => {
     

        try {
            const res = await axiosInstance.post('/create-comment', comment);
            console.log(res);
            if (res.data.status == 201) {
                console.log('created');
            }
        } catch (error) {
            // Handle error response
            console.log(error)
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

    const handleComment = (e) => {
        e.preventDefault();

        const comment = {post_comment_content:message, user_id:userID, post_id:postID}
        createComment(comment)
        console.log(comment)

        setMessage('')
        handleAddModal(false);
    }

    return (
        <div>
        {
            modal && <div className='h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50'>
                <div className='relative bg-white rounded-md shadow-lg w-[500px] text-[15px] mx-auto inline-block'>
                    <span onClick={handleModal} className='absolute top-[10px] right-[10px] hover:bg-slate-200 p-2 rounded-full'><RxCross1 color='' size={18}></RxCross1></span>
                    <div className="p-4">
                        <form onSubmit={handleComment}>
                            <div className='flex flex-col mt-8'>
                                <input type="text" onChange={(e)=>setMessage(e.target.value)}  value={message} name="task_title" className='w-full  box-border py-2 px-4  border-transparent border-b border-b-[#d4d4d4] outline-none placeholder:text-sm hover:border-b-[#5e3cf7fb] hover:border-b-2 bg-slate-200 rounded-2xl' placeholder='write your thought here' />
                            </div>
                            <div className='mt-2 pr-2 flex justify-end py-1'> <button type='submit' className=' flex justify-end hover:text-blue-700'><LuSend size={18}/></button></div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </div>
    );
};

export default CreateComment;