// useAllPlaces.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../routes/axiosInstance';

const useAllHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHotelData = async () => {
        try {
            const response = await axiosInstance.get('/hotels');
            if (response.data?.hotels) {
                setHotels(response.data.hotels);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotelData();
    }, []);

    return { hotels, loading, error };
};

export default useAllHotels;
