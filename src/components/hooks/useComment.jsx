// useAllPlaces.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../routes/axiosInstance';

const useAllComment = () => {
    const [comments, setComment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCommentData = async () => {
        try {
            const response = await axiosInstance.get('/comments');
            if (response.data?.comments) {
                setComment(response.data.comments);
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
        fetchCommentData();
    }, []);

    return { comments, loading, error };
};

export default useAllComment;
