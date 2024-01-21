import React, { useContext, useState } from 'react';
import axiosInstance from '../../../routes/axiosInstance';
import { AuthContext } from '../../../provider/AuthProvider';

const AddPlace = () => {

    const { user } = useContext(AuthContext)
    const [placeName, setPlaceName] = useState("");
    const [rating, setRating] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const createPlace = async (formData) => {
        const config = {
            headers: {'Content-Type': 'multipart/form-data',}
        };
        try {
            const res = await axiosInstance.post('/create-place', formData, config);
            console.log(res);
            if (res.data.status == 201) {
                // setReload(!reload);
                // Swal.fire({
                //     position: 'center',
                //     icon: 'success',
                //     title: 'Task is created successfully',
                //     showConfirmButton: false,
                //     timer: 1500
                // })
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

    const resetForm = () => {
        setPlaceName('');
        setRating('');
        setLocation('');
        setDescription('');
        setImages([]);
        
    }

    const handlePlaceSubmit = (e) => {
        e.preventDefault();

        const id = user?.id;
        const formData = new FormData();
        formData.append('user_id', id);
        formData.append('place_name', placeName);
        formData.append('place_description', description);
        formData.append('place_rating', rating);
        formData.append('place_location', location);

        for (let i = 0; i < images.length; i++) {
            formData.append(`images[${i}]`, images[i]);
        }
         for (const pair of formData.entries()) {
             console.log(pair[0], pair[1]);
         }
        createPlace(formData);
        // console.log(formData)
        resetForm();
    }


    return (
        <div className='w-[700px] mx-auto p-10 bg-white rounded'>
            <h2 className='text-center text-xl font-semibold my-3'>Add Place</h2>
            <form onSubmit={handlePlaceSubmit} >
                <div className='mb-2'>
                    <label>Place Name</label>
                    <input type="text" onChange={(e) => setPlaceName(e.target.value)} value={placeName} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Place name' />
                </div>
               
                <div className='mb-2'>
                    <label>Rating</label>
                    <input type="number" onChange={(e) => setRating(e.target.value)} value={rating} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Place rating' />
                </div>
                <div className='mb-2'>
                    <label>Location</label>
                    <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Location' />
                </div>
                <div className='mb-2'>
                    <label>Choose Images</label>
                    <input type="file" onChange={(e) => setImages(e.target.files)} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='' multiple />
                </div>
               
                <div className='mb-2'>
                    <label>Description</label>
                    <textarea type="text" onChange={(e) => setDescription(e.target.value)} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='write description' rows={4}></textarea>
                </div>
                <div className='mb-2'>
                    <button type='submit' className='px-4 py-1.5 rounded border bg-violet-500 text-white hover:bg-violet-700'>Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddPlace;


