// useAllPlaces.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../routes/axiosInstance';

const useAllPost = () => {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPostData = async () => {
        try {
            const response = await axiosInstance.get('/allPost');
            if (response.data?.posts) {
                setPost(response.data.posts);
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
        fetchPostData();
    }, []);

    return { posts, loading, error };
};

export default useAllPost;
