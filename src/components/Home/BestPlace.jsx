import React, { useEffect, useState } from 'react';
import useAllHotel from '../hooks/useAllHotel';
import axiosInstance from '../../routes/axiosInstance';
import useAllPlaces from '../hooks/useAllPlace';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../../public/css/style.css';

// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

const Place = () => {
    const { places, loading, error } = useAllPlaces();

    useEffect(() => { }, [places])
    console.log(places)
    const limitedPlaces = places.slice(0, 4);

    return (
        <div>
            
            <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-8  '>
                {
                    limitedPlaces?.map((item, index) => {
                        return <div key={index} className='bg-white  rounded border border-gray-200 cd'>
                            <div>
                                {/* {item.place_image?.length > 0 && (
                                    <img
                                        src={`${import.meta.env.VITE_FILE_PATH}${item.place_image[0].place_image}`}
                                        alt="image"
                                        className='rounded-lg h-[250px] w-full'
                                    />
                                )} */}
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    keyboard={{
                                        enabled: true,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Keyboard, Pagination, Navigation]}
                                    className="mySwiper"
                                >

                                    {
                                        item.place_image.map((image, id) => {
                                            return <SwiperSlide>
                                                <img
                                                    src={`${import.meta.env.VITE_FILE_PATH}${image.place_image}`}
                                                    alt="image"
                                                    className='rounded-t h-[250px] w-full'
                                                    // className='rounded-lg'
                                                />
                                            </SwiperSlide>
                                        })
                                    }
                                </Swiper>
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