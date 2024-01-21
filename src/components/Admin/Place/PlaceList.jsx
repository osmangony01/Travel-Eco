import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../routes/axiosInstance';
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom';

const PlaceList = () => {

    const [place, setPlace] = useState([]);

    const fetchFilterData = async () => {
        try {
            // Fetch tasks based on the search term
            const response = await axiosInstance.get("/places")
            //setTasks(response.data);
            console.log(response)
            if (response.data?.places) {
                setPlace(response.data.places);
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
        fetchFilterData();
    }, [])

    useEffect(() => {
        
    },[place])

    console.log(place)
    
    return (
        <div className=' w-full lg:w-[1000px] mx-auto border px-12 pt-6 pb-10 bg-white mt-3 h-full'>
            <h1 className='text-2xl text-center pb-8 font-semibold'>Place list</h1>
            <div>
                <button className='px-4 py-1.5 border border-blue-500 rounded my-4 font-semibold text-blue-500 hover:text-white hover:bg-blue-700'><Link to="/admin/add-place">Add Place</Link></button>

                <div className='overflow-x-auto w-full '>
                    <table className='table w-full'>
                        {place?.length >= 1 && <thead className='bg-blue-100'>
                            <tr>
                                <th className='border p-3 text-center'>#</th>
                                <th className='border p-3 text-center'>Place Name</th>
                                <th className='border p-3 text-center'>Place rating</th>
                                <th className='border p-3 text-center'>Action</th>
                            </tr>
                        </thead>}
                        <tbody>
                            {
                                place.map((item, index) => {
                                    const { place_name, place_rating } = item;
                                    console.log(place_name, place_rating);
                                    
                                    return <tr>
                                        <td className='border p-2'>{index + 1}</td>
                                        <td className='border p-2'>{place_name}</td>
                                        <td className='border p-2'>{place_rating}</td>
                                        <td className='flex justify-evenly items-center border p-2'>
                                            <span>
                                                <button title='Update' className='p-1.5 border text-black hover:text-white border-blue-500 rounded mx-2  font-semibold hover:bg-blue-500'><FiEdit size={18}></FiEdit></button>
                                            </span>
                                            <button title='Delete' className='p-1.5 rounded  font-semibold text-black hover:text-white border border-red-500  hover:bg-red-500'><FaTrashAlt size={16}></FaTrashAlt></button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PlaceList;