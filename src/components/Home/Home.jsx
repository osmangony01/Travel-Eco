import React from 'react';
import Banner from './Banner';
import BestHotels from './BestHotel'
import BestPlaces from './BestPlace'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='py-16 px-10 bg-slate-200'>
                <h2 className='font-bold text-4xl py-10'>Best Destination</h2>
                <BestPlaces></BestPlaces>
            </div>
            <div className='pb-20 px-10 bg-slate-200'>
                <h2 className='font-bold text-4xl py-10'>Best Hotel</h2>
                <BestHotels></BestHotels>
            </div>
        </div>
    );
};

export default Home;