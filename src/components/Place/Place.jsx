import React, { useEffect, useState } from 'react';
import useAllHotel from '../hooks/useAllHotel';
import axiosInstance from '../../routes/axiosInstance';
import useAllPlaces from '../hooks/useAllPlace';
import { FaStar } from 'react-icons/fa';

const Place = () => {
    const { places, loading, error } = useAllPlaces();

    useEffect(() => { }, [places])
    console.log(places)
    return (
        <div>
            {/* {
                places?.map((item, index) => {
                    return <div key={index}>
                        {item.place_name}
                        <div >

                            {item.place_image?.length > 0 && (
                                <img
                                    src={`${import.meta.env.VITE_FILE_PATH}${item.place_image[0].place_image}`}
                                    alt="image"
                                    className='rounded-lg h-[250px] w-full'
                                />
                            )}
                        </div>
                    </div>
                })
            } */}

            <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-8  px-10 py-6 bg-white'>
            {
                places?.map((item, index) => {
                    return <div key={index} className='bg-white rounded cd border'>
                        <div  >
                        {item.place_image?.length > 0 && (
                                <img
                                    src={`${import.meta.env.VITE_FILE_PATH}${item.place_image[0].place_image}`}
                                    alt="image"
                                    className='h-[250px] w-full rounded-t'
                                />
                            )}
                        </div>
                        <div className='text-[#616060] text-[15px] p-4'>
                            <div className='flex justify-between pt-2'>
                                <span className='text-black  text-sm font-semibold'> {item.place_name}</span>
                                <span className='flex justify-center items-center gap-2 text-black'><FaStar></FaStar><span>{item.place_rating}</span></span>
                            </div>
                            <div>{item.place_location}</div>
                        </div>
                    </div>
                })
            }
        </div>
        </div>
    );
};

export default Place;