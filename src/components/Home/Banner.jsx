import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import B1Img from '../../../public/home/1.jpg';
import B2Img from '../../../public/home/2.jpg';
import B3Img from '../../../public/home/3.jpg';




const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                pagination={{
                    clickable: true
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={B1Img} className='w-full h-[500px]' alt="..." />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={B2Img} className='w-full h-[500px]' alt="..." />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={B3Img} className='w-full h-[500px]' alt="..." />
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default Banner;