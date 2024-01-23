// useAllPlaces.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../routes/axiosInstance';

const useAllPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPlaceData = async () => {
        try {
            const response = await axiosInstance.get('/places');
            if (response.data?.places) {
                setPlaces(response.data.places);
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
        fetchPlaceData();
    }, []);

    return { places, loading, error };
};

export default useAllPlaces;
