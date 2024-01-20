import React, { useContext, useState } from 'react';
import axiosInstance from '../../../routes/axiosInstance';
import { AuthContext } from '../../../provider/AuthProvider';

const Hotel = () => {

    const { user } = useContext(AuthContext)
    const [hotelName, setHotelName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [map, setMap] = useState("");
    const [hotelType, setHotelType] = useState("");


    const createHotel = async (formData) => {
        const config = {
            headers: {'Content-Type': 'multipart/form-data',}
        };

        try {
            const res = await axiosInstance.post('/create-hotel', formData, config);
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
        setHotelName('');
        setPrice('');
        setRating('');
        setLocation('');
        setDescription('');
        setImages([]);
        setLatitude('');
        setLongitude('');
        setMap('');
        setHotelType('');
    }

    const handleHotelSubmit = (e) => {
        e.preventDefault();

        const id = user?.id;
        const formData = new FormData();
        formData.append('user_id', id);
        formData.append('hotel_name', hotelName);
        formData.append('hotel_description', description);
        formData.append('hotel_rating', rating);
        formData.append('hotel_price', price);
        formData.append('hotel_location', location);

        for (let i = 0; i < images.length; i++) {
            formData.append(`images[${i}]`, images[i]);
        }
        // for (const pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        createHotel(formData);
        // console.log(formData)
        resetForm();
    }


    return (
        <div className='w-[700px] mx-auto p-10 bg-white rounded'>
            <h2 className='text-center text-xl font-semibold my-3'>Add Hotel</h2>
            <form onSubmit={handleHotelSubmit} >
                <div className='mb-2'>
                    <label>Hotel Name</label>
                    <input type="text" onChange={(e) => setHotelName(e.target.value)} value={hotelName} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Hotel name' />
                </div>
                <div className='mb-2'>
                    <label>Price</label>
                    <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Hotel price' />
                </div>
                <div className='mb-2'>
                    <label>Rating</label>
                    <input type="number" onChange={(e) => setRating(e.target.value)} value={rating} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Hotel rating' />
                </div>
                <div className='mb-2'>
                    <label>Location</label>
                    <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Hotel location' />
                </div>
                <div className='mb-2'>
                    <label>Choose Images</label>
                    <input type="file" onChange={(e) => setImages(e.target.files)} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='' multiple />
                </div>
                {/* <div className='mb-2'>
                    <label>Hotel type</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Hotel name' />
                </div>
                <div className='mb-2'>
                    <label>Latitude</label>
                    <input type="text" onChange={(e) => setLatitude(e.target.value)} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Hotel name' />
                </div>
                <div className='mb-2'>
                    <label>Longitude</label>
                    <input type="text" onChange={(e) => setLongitude(e.target.value)} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Hotel name' />
                </div>
                <div className='mb-2'>
                    <label>Map</label>
                    <input type="text" onChange={(e) => setMap(e.target.value)} className='input-control hover:border-blue-400 focus:border-blue-400' placeholder='Hotel name' />
                </div> */}
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

export default Hotel;


