import React, { useEffect, useState } from 'react';
import useAllHotel from '../hooks/useAllHotel';
import { FaStar } from 'react-icons/fa';

const Hotel = () => {
    const { hotels, loading, error } = useAllHotel();


    useEffect(() => { }, [hotels])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-8  px-10 py-6'>
            {
                hotels?.map((item, index) => {
                    return <div key={index} className='bg-white rounded cd'>
                       
                        <div  >
                            {item.hotel_image?.length > 0 && (
                                <img
                                    src={`${import.meta.env.VITE_FILE_PATH}${item.hotel_image[0].hotel_image}`}
                                    alt="image"
                                    className='rounded-t h-[250px] w-full'
                                />
                            )}
                        </div>
                        <div className='text-[#616060] text-[15px] p-4'>
                            <div className='flex justify-between pt-2'>
                                <span className='text-black  text-sm font-semibold'>{item.hotel_name}</span>
                                <span className='flex justify-center items-center gap-2 text-black'><FaStar></FaStar><span>{item.hotel_rating}</span></span>
                            </div>
                            <div>{item.hotel_location}</div>
                            {/* <div>{`${moment(checkIn).format("MMM D")} - ${moment(checkOut).format("MMM D")}`}</div>
                            <div><span className='text-black text-sm font-semibold'>${price}</span> night</div> */}
                            <div><span className='text-black text-sm font-semibold'>${item.hotel_price}</span> night</div>
                        </div>
                    </div>
                })
            }
        </div>
    );
};

export default Hotel;